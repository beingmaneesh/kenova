"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Lakshmi Nair",
    role: "Parent of Class 8 Student",
    initials: "LN",
    rating: 5,
    text: "Kenova Learning has transformed my son's approach to studies. His grades improved significantly within three months. The teachers are patient, caring, and truly dedicated to each student's growth.",
    avatarBg: "from-[#F97316] to-[#EA580C]",
  },
  {
    name: "Rajesh Kumar",
    role: "Parent of Class 5 Student",
    initials: "RK",
    rating: 5,
    text: "The personal attention my daughter receives here is remarkable. The regular progress reports and parent meetings keep us informed. I highly recommend Kenova Learning to all parents.",
    avatarBg: "from-[#2563EB] to-[#1E3A8A]",
  },
  {
    name: "Fathima Beevi",
    role: "Parent of Class 10 Student",
    initials: "FB",
    rating: 5,
    text: "My child scored excellent marks in the board exam thanks to Kenova Learning. The structured approach, regular tests, and doubt-clearing sessions made all the difference.",
    avatarBg: "from-[#EA580C] to-[#DC2626]",
  },
  {
    name: "Ananya S.",
    role: "Class 9 Student",
    initials: "AS",
    rating: 5,
    text: "I used to struggle with Mathematics and Science. The teachers at Kenova made these subjects easy to understand. Now I feel confident about my studies and exams!",
    avatarBg: "from-[#1E3A8A] to-[#2563EB]",
  },
  {
    name: "Suresh Menon",
    role: "Parent of Class 3 Student",
    initials: "SM",
    rating: 5,
    text: "Even for young children, Kenova provides a warm and supportive environment. My child looks forward to attending classes every day. The foundation building is excellent.",
    avatarBg: "from-[#F97316] to-[#FB923C]",
  },
  {
    name: "Priya Thomas",
    role: "Parent of Class 7 Student",
    initials: "PT",
    rating: 5,
    text: "The affordable fees and flexible timings make it easy for working parents. The quality of education is outstanding and the teachers are always approachable.",
    avatarBg: "from-[#2563EB] to-[#6366F1]",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            What Parents &{" "}
            <span className="text-gradient-orange">Students Say</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            Hear from the families who trust Kenova Learning with their
            children&apos;s education.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-orange-200 mb-4" />
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-[#F97316] text-[#F97316]"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={`bg-gradient-to-br ${t.avatarBg} text-white text-sm font-semibold`}>
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
