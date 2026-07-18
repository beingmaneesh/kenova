import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import Razorpay from "razorpay";
import { z } from "zod/v4";

const orderSchema = z.object({
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

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

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

    const razorpayOrder = await getRazorpay().orders.create({
      amount: calculatedAmount,
      currency: "INR",
      receipt: `kenova_${Date.now()}`,
      notes: {
        studentName: data.studentName,
        parentName: data.parentName,
        phone: data.phone,
      },
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: calculatedAmount,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.issues }, { status: 400 });
    }
    console.error("Create order error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
