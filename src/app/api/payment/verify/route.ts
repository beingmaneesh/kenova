import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod/v4";
import crypto from "crypto";
import nodemailer from "nodemailer";

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
  enrollmentId: z.number().int(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = verifySchema.parse(body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== data.razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    await prisma.paymentTransaction.update({
      where: { razorpayOrderId: data.razorpay_order_id },
      data: {
        razorpayPaymentId: data.razorpay_payment_id,
        razorpaySignature: data.razorpay_signature,
        paymentStatus: "captured",
        paidAt: new Date(),
      },
    });

    await prisma.enrollment.update({
      where: { id: data.enrollmentId },
      data: { status: "Paid" },
    });

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: data.enrollmentId },
      include: {
        student: true,
        parent: true,
        course: true,
        batchPreferences: { include: { batchSlot: true }, orderBy: { preferenceOrder: "asc" } },
      },
    });

    if (enrollment) {
      await sendConfirmationEmail(enrollment);
    }

    return NextResponse.json({ success: true, status: "Paid" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    console.error("Payment verification error:", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendConfirmationEmail(enrollment: any) {
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

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(to right,#1E3A8A,#2563EB);padding:24px;border-radius:12px 12px 0 0;">
        <h2 style="color:#fff;margin:0;">Payment Confirmed — Kenova Learning</h2>
      </div>
      <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
          <p style="color:#166534;font-weight:600;margin:0;">Payment of ₹${(calculatedAmount / 100).toLocaleString("en-IN")} received successfully.</p>
        </div>
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
        </table>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">Kenova Learning — Learn Today, Lead Tomorrow.</p>
    </div>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@kenovalearning.com",
    to: "study@kenovalearning.com",
    replyTo: parent.email || undefined,
    subject: `Payment Confirmed: ${student.studentName} — Class ${student.class} (${boardLabel})`,
    html,
  });
}
