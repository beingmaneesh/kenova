import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: [{ board: "asc" }, { durationMonths: "asc" }],
  });

  const batchSlots = await prisma.batchSlot.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json({ courses, batchSlots });
}
