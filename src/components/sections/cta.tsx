"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DemoDialog } from "@/components/demo-dialog";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { EnrollmentWizard } from "../enrollment-wizard";

export function CTASection() {
  return (
    <section id="cta" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#F97316] p-8 sm:p-12 lg:p-16 text-center"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#FB923C]" />
              <span className="text-sm font-medium text-white">
                Limited Seats Available
              </span>
            </motion.div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Admissions Open Now
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Give your child the advantage of expert guidance, structured
              learning, and continuous academic support. Join Kenova Learning
              today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
             <EnrollmentWizard title={`Enroll  Now`} subtitle={`Get started with Kenova Learning today.`}>
                <span
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "bg-white text-[#F97316] hover:bg-orange-50 rounded-2xl h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                  )}
                >
                   Enroll Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </EnrollmentWizard>
              <a
                href="tel:+919876543210"
                className="inline-flex shrink-0 items-center justify-center rounded-2xl border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-14 px-8 text-base font-semibold transition-all whitespace-nowrap"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
