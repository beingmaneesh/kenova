"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const params = useSearchParams();
  const studentName = params.get("student") || "your child";
  const amount = params.get("amount");

  return (
    <main>
      <Navbar solid />

      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/30 pt-20">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827] mb-3">
              Enrollment Successful!
            </h1>

            {amount && (
              <p className="text-lg text-[#6B7280] mb-2">
                Payment of{" "}
                <strong className="text-[#111827]">
                  ₹{(Number(amount) / 100).toLocaleString("en-IN")}
                </strong>{" "}
                received.
              </p>
            )}

            <p className="text-[#6B7280] mb-8">
              <strong className="text-[#111827]">{studentName}</strong> has been
              successfully enrolled at Kenova Learning. A confirmation email has
              been sent with all the details.
            </p>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left shadow-sm">
              <h3 className="font-heading text-base font-semibold text-[#111827] mb-3">
                What&apos;s Next?
              </h3>
              <ul className="space-y-3 text-sm text-[#6B7280]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  We&apos;ll contact you within 24 hours to confirm your batch
                  timing.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  Check your email for the enrollment confirmation details.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                  Classes will begin as per the assigned batch schedule.
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl h-12 px-6 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919495000086"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#1E3A8A] text-[#1E3A8A] rounded-xl h-12 px-6 text-sm font-semibold hover:bg-blue-50 transition-all"
              >
                WhatsApp Us
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-[#6B7280]">
              <a
                href="tel:+919495000086"
                className="inline-flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 94950 00086
              </a>
              <a
                href="mailto:study@kenovalearning.com"
                className="inline-flex items-center gap-1.5 hover:text-[#2563EB] transition-colors"
              >
                <Mail className="w-4 h-4" />
                study@kenovalearning.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function EnrollmentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
