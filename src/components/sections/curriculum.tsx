"use client";

import { motion } from "framer-motion";
import { CheckCircle2, BookMarked, School, ArrowRight } from "lucide-react";
import { EnquiryDialog } from "@/components/enquiry-dialog";

const curricula = [
  {
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
      "34 hrs Monthly Support"
    ],
    color: "from-[#2563EB] to-[#1E3A8A]",
    checkColor: "text-[#F97316]",
  },
  {
    icon: School,
    title: "CBSE Curriculum",
    description:
      "Complete CBSE curriculum teaching with NCERT-based learning and structured exam preparation.",
    features: [
      "Classes 1 to 10",
      "English Medium",
      "Malayalam Medium",
      "NCERT-based learning",
      "Board exam preparation",
      "34 hrs Monthly Support"
    ],
    color: "from-[#F97316] to-[#EA580C]",
    checkColor: "text-[#2563EB]",
  },
];

export function CurriculumSection() {
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
          {curricula.map((curr, i) => (
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
                <div className="mt-6">
                  <EnquiryDialog title={`Enquire — ${curr.title}`} subtitle={`Learn more about our ${curr.title} programme.`}>
                    <span className={`inline-flex items-center gap-2 text-sm font-semibold ${i === 0 ? 'text-[#2563EB]' : 'text-[#F97316]'} hover:gap-3 transition-all cursor-pointer`}>
                      Enquire Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </EnquiryDialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
