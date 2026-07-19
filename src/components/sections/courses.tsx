"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { EnrollmentWizard } from "@/components/enrollment-wizard";
import {
  Blocks,
  BrainCircuit,
  GraduationCap,
  Calculator,
  FlaskConical,
  BookOpen,
  Languages,
  Globe,
  ArrowRight,
} from "lucide-react";

const courseGroups = [
  {
    icon: Blocks,
    title: "Classes 1–4",
    subtitle: "Foundation Learning",
    description:
      "Building strong fundamentals in reading, writing, mathematics, and basic sciences through interactive and engaging methods.",
    color: "bg-blue-50",
    iconColor: "text-[#2563EB]",
    borderColor: "border-blue-100",
    hoverBorder: "hover:border-[#2563EB]",
    accentBar: "bg-[#2563EB]",
  },
  {
    icon: BrainCircuit,
    title: "Classes 5–7",
    subtitle: "Concept Building",
    description:
      "Strengthening conceptual understanding across all subjects with structured learning, daily practice, and regular revision.",
    color: "bg-orange-50",
    iconColor: "text-[#F97316]",
    borderColor: "border-orange-100",
    hoverBorder: "hover:border-[#F97316]",
    accentBar: "bg-[#F97316]",
  },
  {
    icon: GraduationCap,
    title: "Classes 8–10",
    subtitle: "Board Exam Preparation",
    description:
      "Comprehensive exam-oriented preparation with intensive revision, mock tests, and personalized strategies for board exam success.",
    color: "bg-indigo-50",
    iconColor: "text-[#1E3A8A]",
    borderColor: "border-indigo-100",
    hoverBorder: "hover:border-[#1E3A8A]",
    accentBar: "bg-[#1E3A8A]",
  },
];

const subjects = [
  { icon: Calculator, name: "Mathematics", color: "text-[#2563EB]", bg: "bg-blue-50", hoverBg: "group-hover:bg-[#2563EB]" },
  { icon: FlaskConical, name: "Science", color: "text-[#F97316]", bg: "bg-orange-50", hoverBg: "group-hover:bg-[#F97316]" },
  { icon: BookOpen, name: "English", color: "text-[#1E3A8A]", bg: "bg-indigo-50", hoverBg: "group-hover:bg-[#1E3A8A]" },
  { icon: Languages, name: "Malayalam", color: "text-[#EA580C]", bg: "bg-orange-50", hoverBg: "group-hover:bg-[#EA580C]" },
  { icon: Globe, name: "Social Science", color: "text-[#2563EB]", bg: "bg-blue-50", hoverBg: "group-hover:bg-[#2563EB]" },
  { icon: Languages, name: "Hindi", color: "text-[#EA580C]", bg: "bg-orange-50", hoverBg: "group-hover:bg-[#EA580C]" },
  { icon: Languages, name: "Arabic", color: "text-[#2563EB]", bg: "bg-blue-50", hoverBg: "group-hover:bg-[#2563EB]" },
];

export function CoursesSection() {
  return (
    <section id="courses" className="py-20 sm:py-28 bg-gradient-subtle-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
            Our Courses
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            Structured Learning for{" "}
            <span className="text-gradient-orange">Every Stage</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            From foundation to board exam preparation, our courses are designed
            to help every student excel at their level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {courseGroups.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`bg-white rounded-3xl overflow-hidden border ${course.borderColor} ${course.hoverBorder} shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1`}
            >
              <div className={`h-1.5 ${course.accentBar}`} />
              <div className="p-8">
                <div
                  className={`w-14 h-14 rounded-2xl ${course.color} flex items-center justify-center mb-6`}
                >
                  <course.icon className={`w-7 h-7 ${course.iconColor}`} />
                </div>
                <h3 className="font-heading text-xl font-bold text-[#111827]">
                  {course.title}
                </h3>
                <Badge
                  variant="secondary"
                  className="mt-2 bg-orange-50 text-[#EA580C] font-medium text-xs border border-orange-100"
                >
                  {course.subtitle}
                </Badge>
                <p className="mt-4 text-[#6B7280] text-sm leading-relaxed">
                  {course.description}
                </p>
                <EnrollmentWizard title={`Enquire — ${course.title}`} subtitle={`Get details about ${course.subtitle} programme.`}>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] group-hover:gap-3 transition-all cursor-pointer">
                    Enroll Now
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </EnrollmentWizard>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm"
        >
          <h3 className="font-heading text-xl font-bold text-[#111827] text-center mb-8">
            Subjects We Teach
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl hover:bg-orange-50/50 transition-colors cursor-default group"
              >
                <div className={`w-12 h-12 rounded-xl ${subject.bg} ${subject.hoverBg} flex items-center justify-center transition-colors`}>
                  <subject.icon className={`w-6 h-6 ${subject.color} group-hover:text-white transition-colors`} />
                </div>
                <span className="text-sm font-semibold text-[#111827]">
                  {subject.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
