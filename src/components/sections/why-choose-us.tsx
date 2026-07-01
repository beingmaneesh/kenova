"use client";

import { motion } from "framer-motion";
import {
  Award,
  Users,
  ClipboardCheck,
  FileBarChart,
  HelpCircle,
  UserCheck,
  MessageCircle,
  IndianRupee,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Experienced Teachers",
    description:
      "Qualified faculty who simplify complex concepts and make learning enjoyable and effective.",
    color: "text-[#F97316]",
    bg: "bg-orange-50",
    hoverBg: "group-hover:bg-[#F97316]",
    borderHover: "hover:border-orange-200",
  },
  {
    icon: Users,
    title: "Small Batch Size",
    description:
      "Limited students per batch ensuring individual attention and personalized guidance.",
    color: "text-[#2563EB]",
    bg: "bg-blue-50",
    hoverBg: "group-hover:bg-[#2563EB]",
    borderHover: "hover:border-blue-200",
  },
  {
    icon: ClipboardCheck,
    title: "Regular Tests",
    description:
      "Weekly tests and monthly evaluations to track progress and reinforce learning.",
    color: "text-[#EA580C]",
    bg: "bg-orange-50",
    hoverBg: "group-hover:bg-[#EA580C]",
    borderHover: "hover:border-orange-200",
  },
  {
    icon: FileBarChart,
    title: "Progress Reports",
    description:
      "Detailed monthly reports covering attendance, scores, strengths, and improvement areas.",
    color: "text-[#1E3A8A]",
    bg: "bg-indigo-50",
    hoverBg: "group-hover:bg-[#1E3A8A]",
    borderHover: "hover:border-indigo-200",
  },
  {
    icon: HelpCircle,
    title: "Doubt Clearing",
    description:
      "One-on-one doubt clearing sessions to ensure no student falls behind.",
    color: "text-[#F97316]",
    bg: "bg-orange-50",
    hoverBg: "group-hover:bg-[#F97316]",
    borderHover: "hover:border-orange-200",
  },
  {
    icon: UserCheck,
    title: "Personal Attention",
    description:
      "Individual mentoring and personalized study plans tailored to each student's needs.",
    color: "text-[#2563EB]",
    bg: "bg-blue-50",
    hoverBg: "group-hover:bg-[#2563EB]",
    borderHover: "hover:border-blue-200",
  },
  {
    icon: MessageCircle,
    title: "Parent Communication",
    description:
      "Monthly parent-teacher meetings with transparent updates on academic progress.",
    color: "text-[#EA580C]",
    bg: "bg-orange-50",
    hoverBg: "group-hover:bg-[#EA580C]",
    borderHover: "hover:border-orange-200",
  },
  {
    icon: IndianRupee,
    title: "Affordable Fees",
    description:
      "Quality education at reasonable fees, making academic excellence accessible to all.",
    color: "text-[#1E3A8A]",
    bg: "bg-indigo-50",
    hoverBg: "group-hover:bg-[#1E3A8A]",
    borderHover: "hover:border-indigo-200",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-gradient-subtle-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            Why Parents{" "}
            <span className="text-gradient-orange">Trust Kenova</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            A safe, positive learning environment where every child receives the
            care and support they need to succeed.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`bg-white rounded-2xl p-6 border border-gray-100 ${reason.borderHover} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 rounded-xl ${reason.bg} ${reason.hoverBg} flex items-center justify-center mb-4 transition-colors`}>
                <reason.icon className={`w-6 h-6 ${reason.color} group-hover:text-white transition-colors`} />
              </div>
              <h3 className="font-heading text-base font-semibold text-[#111827] mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
