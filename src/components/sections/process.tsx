"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  FileSearch,
  BookOpenCheck,
  Calendar,
  PenTool,
  BarChart3,
  Trophy,
} from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Admission", desc: "Simple enrollment process", color: "text-[#F97316]", bg: "bg-orange-50", numBg: "bg-[#F97316]" },
  { icon: FileSearch, title: "Assessment", desc: "Initial academic evaluation", color: "text-[#2563EB]", bg: "bg-blue-50", numBg: "bg-[#2563EB]" },
  { icon: BookOpenCheck, title: "Study Plan", desc: "Customized learning approach", color: "text-[#EA580C]", bg: "bg-orange-50", numBg: "bg-[#EA580C]" },
  { icon: Calendar, title: "Weekly Classes", desc: "Structured classroom sessions", color: "text-[#1E3A8A]", bg: "bg-indigo-50", numBg: "bg-[#1E3A8A]" },
  { icon: PenTool, title: "Tests", desc: "Weekly & monthly evaluations", color: "text-[#F97316]", bg: "bg-orange-50", numBg: "bg-[#F97316]" },
  { icon: BarChart3, title: "Tracking", desc: "Detailed progress reports", color: "text-[#2563EB]", bg: "bg-blue-50", numBg: "bg-[#2563EB]" },
  { icon: Trophy, title: "Success", desc: "Academic excellence achieved", color: "text-[#EA580C]", bg: "bg-orange-50", numBg: "bg-[#EA580C]" },
];

export function ProcessSection() {
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
            Our Process
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            The Kenova{" "}
            <span className="text-gradient-orange">Learning Journey</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            A structured path from enrollment to academic success, with support
            at every step.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F97316]/20 via-[#2563EB]/30 to-[#EA580C]/20 -translate-y-1/2" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 group-hover:border-orange-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                  <step.icon className={`w-7 h-7 ${step.color}`} />
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${step.numBg} text-white text-xs font-bold flex items-center justify-center`}>
                    {i + 1}
                  </span>
                </div>
                <h4 className="mt-4 font-heading text-sm font-semibold text-[#111827]">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs text-[#6B7280]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
