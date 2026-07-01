"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  PenTool,
  Award,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

const galleryItems = [
  {
    icon: BookOpen,
    title: "Focused Learning",
    desc: "Students engaged in deep learning sessions",
    span: "md:col-span-2 md:row-span-2",
    color: "from-[#F97316] to-[#EA580C]",
  },
  {
    icon: Users,
    title: "Classroom Sessions",
    desc: "Interactive and engaging teaching",
    span: "",
    color: "from-[#2563EB] to-[#1E3A8A]",
  },
  {
    icon: PenTool,
    title: "Assessment Days",
    desc: "Regular tests and evaluations",
    span: "",
    color: "from-[#EA580C] to-[#DC2626]",
  },
  {
    icon: Award,
    title: "Achievements",
    desc: "Celebrating student success",
    span: "",
    color: "from-[#FB923C] to-[#F97316]",
  },
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    desc: "Dedicated and experienced teachers",
    span: "",
    color: "from-[#1E3A8A] to-[#2563EB]",
  },
  {
    icon: Lightbulb,
    title: "Activities",
    desc: "Beyond textbook learning",
    span: "md:col-span-2",
    color: "from-[#F97316] to-[#2563EB]",
  },
];

export function GallerySection() {
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
            Gallery
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            Life at{" "}
            <span className="text-[#1E3A8A]">Kenova</span>{" "}
            <span className="text-[#F97316]">Learning</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            A glimpse into our vibrant learning environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`${item.span} relative rounded-2xl overflow-hidden group cursor-pointer`}
            >
              <div
                className={`bg-gradient-to-br ${item.color} w-full h-full min-h-[180px] sm:min-h-[200px] flex flex-col items-center justify-center p-6 text-center`}
              >
                <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white/90 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-heading text-sm sm:text-base font-bold text-white">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
