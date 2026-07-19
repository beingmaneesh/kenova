import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [courses, batchSlots] = await Promise.all([
      prisma.course.findMany(),
      prisma.batchSlot.findMany(),
    ]);
    return NextResponse.json({ courses, batchSlots });
  } catch (err) {
    console.error("Courses API error:", err);
    return NextResponse.json({
      error: err instanceof Error ? err.message : "Unknown",
    }, { status: 500 });
  }
}
