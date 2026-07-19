"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, BookMarked, School, ArrowRight, IndianRupee, Info } from "lucide-react";
import { EnrollmentWizard } from "@/components/enrollment-wizard";

interface Course {
  id: number;
  board: string;
  durationMonths: number;
  price: number;
  additionalSubjectPrice: number;
}

const cardMeta = [
  {
    board: "kerala",
    icon: BookMarked,
    title: "Kerala State Syllabus",
    description:
      "Comprehensive coverage of Kerala State Board curriculum with focus on conceptual clarity and exam readiness.",
    features: [
      "Classes 1 to 10",
      "English Medium",
      "Malayalam Medium",
      "Latest SCERT curriculum",
      "Exam-oriented preparation",
      "34 hrs Monthly Support",
    ],
    color: "from-[#2563EB] to-[#1E3A8A]",
    checkColor: "text-[#F97316]",
    planAccent: "border-[#2563EB]",
    planBadgeBg: "bg-[#2563EB]",
    linkColor: "text-[#2563EB]",
  },
  {
    board: "cbse",
    icon: School,
    title: "CBSE Curriculum",
    description:
      "Complete CBSE curriculum teaching with NCERT-based learning and structured exam preparation.",
    features: [
      "Classes 1 to 10",
      "English Medium",
      "Malayalam Medium",
      "NCERT-based learning",
      "Board Exam preparation",
      "34 hrs Monthly Support",
    ],
    color: "from-[#F97316] to-[#EA580C]",
    checkColor: "text-[#2563EB]",
    planAccent: "border-[#F97316]",
    planBadgeBg: "bg-[#F97316]",
    linkColor: "text-[#F97316]",
  },
];

const badgeMap: Record<number, string> = { 6: "Popular", 10: "Best Value" };

export function CurriculumSection() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then((r) => r.json())
      .then((data) => {
        if (data.courses) setCourses(data.courses);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
            Curriculum
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            Two Syllabi,{" "}
            <span className="text-gradient-orange">One Standard</span>{" "}
            of Excellence
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            Whether your child follows Kerala State or CBSE, we deliver expert
            teaching in both English and Malayalam medium.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cardMeta.map((curr, i) => {
            const boardCourses = courses
              .filter((c) => c.board === curr.board)
              .sort((a, b) => a.durationMonths - b.durationMonths);
            const additionalSubjectPrice = boardCourses.length > 0
              ? boardCourses[0].additionalSubjectPrice / 100
              : null;

            return (
              <motion.div
                key={curr.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${curr.color} p-6 sm:p-8`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <curr.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                        {curr.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[#6B7280] leading-relaxed">
                    {curr.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {curr.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${curr.checkColor} flex-shrink-0`} />
                        <span className="text-sm font-medium text-[#111827]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {boardCourses.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold text-[#374151] uppercase tracking-wider mb-3 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        Plans & Pricing
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {boardCourses.map((course) => {
                          const badge = badgeMap[course.durationMonths] || "";
                          return (
                            <div
                              key={course.id}
                              className={`relative rounded-xl border-2 ${badge ? curr.planAccent : "border-gray-100"} bg-gray-50/50 p-3 text-center transition-all hover:shadow-md`}
                            >
                              {badge && (
                                <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 ${curr.planBadgeBg} text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap`}>
                                  {badge}
                                </span>
                              )}
                              <p className="text-[11px] font-medium text-[#6B7280] mt-1">
                                {course.durationMonths} Months
                              </p>
                              <p className="text-xl font-bold text-[#111827] leading-tight mt-1">
                                ₹{course.price / 100}
                              </p>
                              <p className="text-[10px] text-[#9CA3AF]">/mo per subject</p>
                            </div>
                          );
                        })}
                      </div>

                      {additionalSubjectPrice !== null && (
                        <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                          <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-700 leading-relaxed">
                            <span className="font-semibold">Additional subjects</span> (Social Science, Malayalam, Hindi) can be added at{" "}
                            <span className="font-bold text-amber-900">₹{additionalSubjectPrice}/mo</span> per subject during enrollment.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-6">
                    <EnrollmentWizard title={`Enroll — ${curr.title}`} subtitle={`Learn more about our ${curr.title} programme.`}>
                      <span className={`inline-flex items-center gap-2 text-sm font-semibold ${curr.linkColor} hover:gap-3 transition-all cursor-pointer`}>
                        Enroll Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </EnrollmentWizard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
