"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Clock } from "lucide-react";

const morningBatches = ["05:45 AM – 06:45 AM", "06:45 AM – 07:45 AM"];

const eveningBatches = [
  "05:30 PM – 06:30 PM",
  "06:30 PM – 07:30 PM",
  "07:30 PM – 08:30 PM",
  "08:30 PM – 09:30 PM",
  "09:00 PM – 10:00 PM",
];

export function ClassTimingsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
            Class Timings
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            Flexible Batches for{" "}
            <span className="text-gradient-orange">Every Schedule</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            Multiple batches throughout the day to accommodate different school
            timings. Students receive approximately 34 hours of learning every
            month.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                Morning Batches
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {morningBatches.map((time) => (
                <div
                  key={time}
                  className="flex items-center gap-3 p-4 rounded-xl bg-orange-50/50 border border-orange-100 hover:bg-orange-50 transition-colors"
                >
                  <Clock className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  <span className="font-medium text-[#111827]">{time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
          >
            <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                Evening Batches
              </h3>
            </div>
            <div className="p-6 space-y-3">
              {eveningBatches.map((time) => (
                <div
                  key={time}
                  className="flex items-center gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100 hover:bg-blue-50 transition-colors"
                >
                  <Clock className="w-5 h-5 text-[#2563EB] flex-shrink-0" />
                  <span className="font-medium text-[#111827]">{time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
