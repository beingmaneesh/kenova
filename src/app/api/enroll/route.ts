import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Razorpay from "razorpay";
import { z } from "zod/v4";

export const dynamic = "force-dynamic";

const enrollSchema = z.object({
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

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = enrollSchema.parse(body);

    const course = await prisma.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Invalid course selected" }, { status: 400 });
    }

    const extraCount = data.additionalSubjects.length;
    const baseTotal = course.price * course.durationMonths;
    const extraTotal = course.additionalSubjectPrice * extraCount * course.durationMonths;
    const calculatedAmount = baseTotal + extraTotal;

    const student = await prisma.student.create({
      data: {
        studentName: data.studentName,
        class: data.studentClass,
        board: data.board,
        schoolName: data.schoolName,
      },
    });

    const parent = await prisma.parent.create({
      data: {
        parentName: data.parentName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
      },
    });

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        parentId: parent.id,
        courseId: course.id,
        additionalSubjects: data.additionalSubjects.join(","),
        calculatedAmount,
        status: "Pending",
        batchPreferences: {
          create: data.batchPreferences.map((slotId, idx) => ({
            batchSlotId: slotId,
            preferenceOrder: idx + 1,
          })),
        },
      },
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: calculatedAmount,
      currency: "INR",
      receipt: `enroll_${enrollment.id}`,
      notes: {
        enrollmentId: String(enrollment.id),
        studentName: data.studentName,
        parentName: data.parentName,
      },
    });

    await prisma.paymentTransaction.create({
      data: {
        enrollmentId: enrollment.id,
        amount: calculatedAmount,
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: "created",
      },
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: calculatedAmount,
      currency: "INR",
      enrollmentId: enrollment.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.issues }, { status: 400 });
    }
    console.error("Enrollment error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
