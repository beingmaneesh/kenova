"use client";

import { motion } from "framer-motion";
import {
  UserCheck,
  Award,
  ClipboardCheck,
  Lightbulb,
  Users,
} from "lucide-react";

const features = [
  {
    icon: UserCheck,
    title: "Personal Attention",
    desc: "Small batch sizes ensure every student gets individual guidance and support.",
    color: "text-[#F97316]",
    hoverBg: "group-hover:bg-[#F97316]",
  },
  {
    icon: Award,
    title: "Experienced Teachers",
    desc: "Qualified, dedicated faculty who simplify complex concepts and make learning enjoyable.",
    color: "text-[#2563EB]",
    hoverBg: "group-hover:bg-[#2563EB]",
  },
  {
    icon: ClipboardCheck,
    title: "Regular Assessments",
    desc: "Weekly tests, monthly evaluations, and detailed progress reports for continuous improvement.",
    color: "text-[#EA580C]",
    hoverBg: "group-hover:bg-[#EA580C]",
  },
  {
    icon: Lightbulb,
    title: "Concept-Based Learning",
    desc: "Deep understanding of subjects through interactive, concept-driven teaching methods.",
    color: "text-[#1E3A8A]",
    hoverBg: "group-hover:bg-[#1E3A8A]",
  },
  {
    icon: Users,
    title: "Individual Mentoring",
    desc: "One-on-one mentoring to address each student's unique strengths and areas for growth.",
    color: "text-[#F97316]",
    hoverBg: "group-hover:bg-[#F97316]",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-4/3 rounded-3xl bg-gradient-to-br from-orange-100 via-orange-50 to-blue-50 overflow-hidden shadow-lg bg-cover" style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.9)), url('/images/kenova-about.jpg')",
                }}>
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ffb785] to-[#EA580C] mx-auto mb-4 flex items-center justify-center shadow-md">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-[#1E3A8A]">
                      10+ Years
                    </h4>
                    <p className="text-[#000] text-sm mt-1">
                      of Academic Excellence
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card-strong rounded-2xl p-5 shadow-lg border-t-4 border-t-[#F97316]">
                <p className="text-2xl font-bold text-[#F97316] font-heading">
                  34 hrs
                </p>
                <p className="text-sm text-[#6B7280]">Monthly Support</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] leading-tight">
              Welcome to{" "} <br />
              <span className="text-[#1E3A8A]">Kenova</span>{" "}
              <span className="text-[#F97316]">Learning</span>
            </h2>
            <p className="mt-6 text-lg text-[#6B7280] leading-relaxed">
              At Kenova Learning, we are committed to helping students achieve
              academic excellence through quality education, disciplined
              learning, and personal attention. With experienced teachers,
              structured lesson plans, and regular assessments, we help every
              child build confidence and develop a lifelong love for learning.
            </p>
            <div className="mt-8 space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 ${f.hoverBg} transition-colors`}>
                    <f.icon className={`w-5 h-5 ${f.color} group-hover:text-white transition-colors`} />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-semibold text-[#111827]">
                      {f.title}
                    </h4>
                    <p className="text-sm text-[#6B7280] mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
