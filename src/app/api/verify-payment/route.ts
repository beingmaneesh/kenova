import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod/v4";
import crypto from "crypto";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  parentName: z.string().min(1),
  phone: z.string().min(10),
  whatsapp: z.string().optional().default(""),
  email: z.union([z.string().email(), z.literal("")]).optional().default(""),
  studentName: z.string().min(1),
  studentClass: z.number().int().min(1).max(10),
  board: z.enum(["kerala", "cbse"]),
  schoolName: z.string().optional().default(""),
  courseId: z.number().int(),
  additionalSubjects: z.array(z.string()).optional().default([]),
  batchPreferences: z.array(z.number().int()).length(3),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = verifySchema.parse(body);

    // 1. Verify Razorpay signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== data.razorpay_signature) {
      console.error("Signature mismatch:", { expected: expectedSignature, received: data.razorpay_signature });
      return NextResponse.json({ error: "Payment signature verification failed. Please contact support." }, { status: 400 });
    }

    // 2. Look up the course for amount verification
    const course = await prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) {
      return NextResponse.json({ error: "Invalid course" }, { status: 400 });
    }

    const extraCount = data.additionalSubjects.length;
    const calculatedAmount =
      course.price * course.durationMonths +
      course.additionalSubjectPrice * extraCount * course.durationMonths;

    // 3. Save Student
    const student = await prisma.student.create({
      data: {
        studentName: data.studentName,
        class: data.studentClass,
        board: data.board,
        schoolName: data.schoolName,
      },
    });

    // 4. Save Parent
    const parent = await prisma.parent.create({
      data: {
        parentName: data.parentName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
      },
    });

    // 5. Save Enrollment with batch preferences
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        parentId: parent.id,
        courseId: course.id,
        additionalSubjects: data.additionalSubjects.join(","),
        calculatedAmount,
        status: "Paid",
        batchPreferences: {
          create: data.batchPreferences.map((slotId, idx) => ({
            batchSlotId: slotId,
            preferenceOrder: idx + 1,
          })),
        },
      },
    });

    // 6. Save Payment
    await prisma.paymentTransaction.create({
      data: {
        enrollmentId: enrollment.id,
        amount: calculatedAmount,
        razorpayOrderId: data.razorpay_order_id,
        razorpayPaymentId: data.razorpay_payment_id,
        razorpaySignature: data.razorpay_signature,
        paymentStatus: "captured",
        paidAt: new Date(),
      },
    });

    // 7. Fetch full enrollment for emails
    const fullEnrollment = await prisma.enrollment.findUnique({
      where: { id: enrollment.id },
      include: {
        student: true,
        parent: true,
        course: true,
        batchPreferences: { include: { batchSlot: true }, orderBy: { preferenceOrder: "asc" } },
      },
    });

    // 8. Send emails (non-blocking — enrollment is already saved)
    if (fullEnrollment) {
      try {
        await sendEmails(fullEnrollment);
      } catch (emailErr) {
        console.error("Email sending failed (enrollment is saved):", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error("Zod validation error:", err.issues);
      return NextResponse.json({ error: "Validation failed: " + err.issues.map(i => `${i.path.join(".")}: ${i.message}`).join(", ") }, { status: 400 });
    }
    console.error("Payment verification error:", err);
    return NextResponse.json({ error: "Server error: " + (err instanceof Error ? err.message : "Unknown error") }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendEmails(enrollment: any) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { student, parent, course, batchPreferences, additionalSubjects, calculatedAmount } = enrollment;
  const extraSubs = additionalSubjects ? additionalSubjects.split(",").filter(Boolean) : [];
  const boardLabel = course.board === "kerala" ? "Kerala State" : "CBSE";
  const prefLabels = ["1st Choice", "2nd Choice", "3rd Choice"];
  const prefColors = ["#F97316", "#2563EB", "#1E3A8A"];

  const batchRows = batchPreferences
    .map((bp: { batchSlot: { label: string; period: string } }, i: number) => `
      <tr>
        <td style="padding:3px 10px 3px 0;">
          <span style="background:${prefColors[i]};color:#fff;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">${prefLabels[i]}</span>
        </td>
        <td style="padding:3px 0;font-size:14px;">${bp.batchSlot.label} (${bp.batchSlot.period})</td>
      </tr>`)
    .join("");

  const detailsTable = `
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;width:140px;">Parent Name</td><td style="padding:8px 0;color:#111827;">${parent.parentName}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Phone</td><td style="padding:8px 0;color:#111827;">${parent.phone}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Email</td><td style="padding:8px 0;color:#111827;">${parent.email || "Not provided"}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Student Name</td><td style="padding:8px 0;color:#111827;">${student.studentName}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Class</td><td style="padding:8px 0;color:#111827;">Class ${student.class}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Board</td><td style="padding:8px 0;color:#111827;">${boardLabel}</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Duration</td><td style="padding:8px 0;color:#111827;">${course.durationMonths} months</td></tr>
      <tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Base Subjects</td><td style="padding:8px 0;color:#111827;">Science, Maths, English</td></tr>
      ${extraSubs.length ? `<tr><td style="padding:8px 0;font-weight:bold;color:#374151;">Additional</td><td style="padding:8px 0;color:#111827;">${extraSubs.join(", ")}</td></tr>` : ""}
      <tr><td style="padding:12px 0;font-weight:bold;color:#374151;vertical-align:top;">Batch Preferences</td><td style="padding:12px 0;"><table style="border-collapse:collapse;">${batchRows}</table></td></tr>
      <tr style="border-top:2px solid #e5e7eb;"><td style="padding:12px 0;font-weight:bold;color:#111827;font-size:16px;">Total Paid</td><td style="padding:12px 0;font-weight:bold;color:#F97316;font-size:16px;">₹${(calculatedAmount / 100).toLocaleString("en-IN")}</td></tr>
    </table>`;

  // Email to Kenova (admin notification)
  const kenovaHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(to right,#1E3A8A,#2563EB);padding:24px;border-radius:12px 12px 0 0;">
        <h2 style="color:#fff;margin:0;">New Enrollment — Payment Received</h2>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
          <p style="color:#166534;font-weight:600;margin:0;">Payment of ₹${(calculatedAmount / 100).toLocaleString("en-IN")} received successfully.</p>
        </div>
        ${detailsTable}
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">Kenova Learning — Learn Today, Lead Tomorrow.</p>
    </div>`;

  // Email to Parent (confirmation)
  const parentHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(to right,#1E3A8A,#2563EB);padding:24px;border-radius:12px 12px 0 0;">
        <h2 style="color:#fff;margin:0;">Enrollment Confirmed — Kenova Learning</h2>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p style="color:#111827;font-size:15px;">Dear ${parent.parentName},</p>
        <p style="color:#6B7280;font-size:14px;line-height:1.6;">Thank you for enrolling <strong>${student.studentName}</strong> at Kenova Learning! Your payment has been received and the enrollment is confirmed.</p>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;margin:16px 0;">
          <p style="color:#166534;font-weight:600;margin:0;">Payment of ₹${(calculatedAmount / 100).toLocaleString("en-IN")} received successfully.</p>
        </div>
        <h3 style="color:#111827;font-size:15px;margin:20px 0 12px;">Enrollment Details</h3>
        ${detailsTable}
        <div style="background:#EFF6FF;border-radius:8px;padding:16px;margin-top:20px;">
          <p style="color:#1E3A8A;font-weight:600;margin:0 0 8px;">What's Next?</p>
          <p style="color:#374151;font-size:13px;margin:0;line-height:1.5;">We'll contact you within 24 hours to confirm your batch timing and share further details. If you have any questions, feel free to reach us at <a href="tel:+919495000086" style="color:#2563EB;">+91 94950 00086</a> or <a href="mailto:study@kenovalearning.com" style="color:#2563EB;">study@kenovalearning.com</a>.</p>
        </div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">Kenova Learning — Learn Today, Lead Tomorrow.</p>
    </div>`;

  const subject = `Enrollment Confirmed: ${student.studentName} — Class ${student.class} (${boardLabel})`;

  // Send to Kenova
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@kenovalearning.com",
    to: "study@kenovalearning.com",
    replyTo: parent.email || undefined,
    subject: `New Enrollment: ${student.studentName} — Class ${student.class} (${boardLabel})`,
    html: kenovaHtml,
  });

  // Send to Parent (if email provided)
  if (parent.email) {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@kenovalearning.com",
      to: parent.email,
      subject,
      html: parentHtml,
    });
  }
}
