import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const courses = [
    { board: "kerala", durationMonths: 3, price: 49900, additionalSubjectPrice: 15000 },
    { board: "kerala", durationMonths: 6, price: 39900, additionalSubjectPrice: 15000 },
    { board: "kerala", durationMonths: 10, price: 29900, additionalSubjectPrice: 15000 },
    { board: "cbse", durationMonths: 3, price: 79900, additionalSubjectPrice: 20000 },
    { board: "cbse", durationMonths: 6, price: 69900, additionalSubjectPrice: 20000 },
    { board: "cbse", durationMonths: 10, price: 59900, additionalSubjectPrice: 20000 },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: courses.indexOf(course) + 1 },
      update: course,
      create: course,
    });
  }

  const batchSlots = [
    { label: "05:45 AM – 06:45 AM", period: "Morning" },
    { label: "06:45 AM – 07:45 AM", period: "Morning" },
    { label: "05:30 PM – 06:30 PM", period: "Evening" },
    { label: "06:30 PM – 07:30 PM", period: "Evening" },
    { label: "07:30 PM – 08:30 PM", period: "Evening" },
    { label: "08:30 PM – 09:30 PM", period: "Evening" },
    { label: "09:00 PM – 10:00 PM", period: "Evening" },
  ];

  for (let i = 0; i < batchSlots.length; i++) {
    await prisma.batchSlot.upsert({
      where: { id: i + 1 },
      update: batchSlots[i],
      create: batchSlots[i],
    });
  }

  console.log("Seeded 6 courses and 7 batch slots.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
