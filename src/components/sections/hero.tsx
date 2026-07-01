"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/enquiry-dialog";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
  Trophy,
  Lightbulb,
} from "lucide-react";

const floatingCards = [
  { label: "Kerala State", delay: 0.8 },
  { label: "CBSE", delay: 1.0 },
  { label: "English Medium", delay: 1.2 },
  { label: "Malayalam Medium", delay: 1.4 },
];

const pillars = [
  {
    icon: GraduationCap,
    word: "Learn",
    sub: "Continuously",
    color: "text-[#1E3A8A]",
  },
  {
    icon: TrendingUp,
    word: "Grow",
    sub: "Consistently",
    color: "text-[#F97316]",
  },
  { icon: Trophy, word: "Lead", sub: "Confidently", color: "text-[#2563EB]" },
  {
    icon: Lightbulb,
    word: "Succeed",
    sub: "Limitlessly",
    color: "text-[#EA580C]",
  },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/30" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/15 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 mb-6"
            >
              <BookOpen className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-medium text-[#EA580C]">
                Classes 1 to 10 | Kerala & CBSE
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#111827] leading-[1.1] tracking-tight">
              Learn Today, <span className="text-gradient">Lead Tomorrow.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#6B7280] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              At Kenova Learning, we help students from Classes 1 to 10 achieve
              academic excellence through expert teaching, personal attention,
              and structured learning.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <EnquiryDialog
                title="Admissions Open"
                subtitle="Secure your child's seat — fill in the details below."
              >
                <span
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-2xl h-14 px-8 text-base font-semibold shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all group cursor-pointer",
                  )}
                >
                  Admissions Open
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </EnquiryDialog>
              <EnquiryDialog>
                <span
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 rounded-2xl h-14 px-8 text-base font-semibold transition-all cursor-pointer",
                  )}
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </span>
              </EnquiryDialog>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {["#F97316", "#2563EB", "#EA580C", "#1E3A8A"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: color }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ),
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#111827]">
                  1000+ Students
                </p>
                <p className="text-xs text-[#6B7280]">
                  Trusted by parents across Kerala
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative  "
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-blue-100 rounded-[2rem] rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white rounded-[2rem] -rotate-1 shadow-xl" />
              <div
                className="relative bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] rounded-[2rem] p-8 shadow-lg h-full flex flex-col items-center justify-center bg-cover"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)), url('/images/hero-img.jpg')",
                }}
              >
                <div className="w-70 h-40 flex items-center justify-center mb-6">
                  <Image
                    src="/images/logo-i.png"
                    alt="Kenova Learning"
                    width={256}
                    height={164}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-heading text-2xl font-bold text-center">
                  <span className="text-[#ffffff]">Kenova</span>{" "}
                  <span className="text-[#ffffff]">Learning</span>
                </h3>
                <p className="text-[#ffffff] text-center mt-2 text-sm">
                  Learn Today, Lead Tomorrow.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-xs">
                  {floatingCards.map((card, index) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: card.delay, duration: 0.5 }}
                      className={`glass-card rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-sm ${
                        index >= 2 ? "hidden lg:flex" : "flex"
                      }`}
                    >
                      <CheckCircle2 className="w-6 h-4 text-[#F97316] flex-shrink-0" />
                      <span className="text-xs font-medium text-[#111827]">
                        {card.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="absolute -top-4 -right-4 hidden lg:block glass-card-strong rounded-2xl p-4 shadow-lg border-l-4 border-l-[#F97316]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#F97316]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">95%</p>
                  <p className="text-xs text-[#6B7280]">Improvement</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 glass-card-strong rounded-2xl p-4 shadow-lg border-l-4 border-l-[#2563EB]"
            >
              <div className="flex items-center gap-3 hidden lg:block">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827]">10+ Years</p>
                  <p className="text-xs text-[#6B7280]">Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {pillars.map((p, i) => (
              <motion.div
                key={p.word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-blue-50" : "bg-orange-50"}`}
                >
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                </div>
                <p className={`font-heading text-sm font-bold ${p.color}`}>
                  {p.word}
                </p>
                <p className="text-xs text-[#6B7280]">{p.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
