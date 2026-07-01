"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Clock, TrendingUp, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: 1000, suffix: "+", label: "Students Guided", color: "text-[#2563EB]", bg: "bg-blue-50" },
  { icon: Clock, value: 10, suffix: "+", label: "Years Experience", color: "text-[#F97316]", bg: "bg-orange-50" },
  { icon: TrendingUp, value: 95, suffix: "%", label: "Academic Improvement", color: "text-[#1E3A8A]", bg: "bg-indigo-50" },
  { icon: Heart, value: 500, suffix: "+", label: "Happy Parents", color: "text-[#EA580C]", bg: "bg-orange-50" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 sm:p-8 text-center border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <p className={`font-heading text-3xl sm:text-4xl font-bold ${stat.color}`}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-[#6B7280] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
