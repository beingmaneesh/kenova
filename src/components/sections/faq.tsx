"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How can I enroll my child at Kenova Learning?",
    a: "You can visit our centre directly or contact us via phone or WhatsApp. We'll conduct an initial assessment and guide you through the simple enrollment process. Admissions are open throughout the year.",
  },
  {
    q: "What are the fee details?",
    a: "We offer affordable fee structures with flexible payment options. Fees vary based on the class and syllabus. Please contact us directly for detailed fee information.",
  },
  {
    q: "Which curriculum do you follow?",
    a: "We offer tuition for both Kerala State Syllabus (SCERT) and CBSE Curriculum. Students can learn in English or Malayalam medium based on their school's medium of instruction.",
  },
  {
    q: "What are the class timings?",
    a: "We offer flexible batch timings: Morning batches from 5:45 AM to 7:45 AM, and evening batches from 5:30 PM to 10:00 PM. Students can choose the batch that best fits their school schedule.",
  },
  {
    q: "Do you offer online classes?",
    a: "Currently we focus on in-person classroom learning for the best student-teacher interaction. However, we may offer online support for specific needs. Please contact us for details.",
  },
  {
    q: "How do you track student progress?",
    a: "We conduct weekly tests, monthly evaluations, and provide detailed progress reports. Monthly parent-teacher meetings ensure parents stay informed about their child's academic journey.",
  },
  {
    q: "What is the batch size?",
    a: "We maintain small batch sizes to ensure every student receives individual attention and personal guidance. This allows our teachers to focus on each student's unique learning needs.",
  },
  {
    q: "Do you provide study materials?",
    a: "Yes, we provide structured study materials, practice worksheets, and revision notes aligned with the curriculum. Additional materials are provided for exam preparation.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-gradient-subtle-blue">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
            FAQ
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827]">
            Frequently Asked{" "}
            <span className="text-gradient-orange">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            Everything you need to know about Kenova Learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm data-open:shadow-md data-open:border-orange-200 transition-all"
              >
                <AccordionTrigger className="text-left font-heading text-base font-semibold text-[#111827] py-5 hover:no-underline hover:text-[#F97316]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B7280] text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
