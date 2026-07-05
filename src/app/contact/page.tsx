"use client";

import { useState, useTransition, type FormEvent } from "react";
import { motion } from "framer-motion";
import { submitEnquiry } from "@/app/actions/enquiry";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BreadcrumbHero } from "@/components/breadcrumb-hero";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  User,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["Kenova Learning Centre", "second floor , Naduthodiyil building ,Pattambi road Edappal, Malappuram 679576"],
    color: "text-[#F97316]",
    bg: "bg-orange-50",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 9100100983"],
    href: "tel:+919100100983",
    color: "text-[#2563EB]",
    bg: "bg-blue-50",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["study@kenovalearning.com"],
    href: "mailto:study@kenovalearning.com",
    color: "text-[#EA580C]",
    bg: "bg-orange-50",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+91 9100100983", "Quick replies guaranteed"],
    href: "https://wa.me/919100100983",
    color: "text-[#10B981]",
    bg: "bg-emerald-50",
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: ["Mon – Sat: 09:00 AM – 06:00 PM", "Sunday: Closed"],
    color: "text-[#1E3A8A]",
    bg: "bg-indigo-50",
  },
  {
    icon: GraduationCap,
    title: "Admissions",
    lines: ["Open throughout the year", "Walk-in or call to enquire"],
    color: "text-[#F97316]",
    bg: "bg-orange-50",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentName: "",
    class: "",
    syllabus: "",
    message: "",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await submitEnquiry(formData);
      if (result.success) {
        setSubmitted(true);
        setFormData({
          parentName: "",
          phone: "",
          email: "",
          studentName: "",
          class: "",
          syllabus: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <main>
      <Navbar solid />
      <BreadcrumbHero
        title="Contact Us"
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      {/* Contact Info Cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">
              We&apos;d Love to{" "}
              <span className="text-gradient">Hear From You</span>
            </h2>
            <p className="mt-4 text-lg text-[#6B7280]">
              Have questions about admissions, courses, or timings? Reach out to
              us through any of the channels below.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${info.bg} flex items-center justify-center mb-4`}
                >
                  <info.icon className={`w-6 h-6 ${info.color}`} />
                </div>
                <h3 className="font-heading text-base font-semibold text-[#111827] mb-2">
                  {info.title}
                </h3>
                {info.lines.map((line) =>
                  info.href ? (
                    <a
                      key={line}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`block text-sm text-[#6B7280] hover:${info.color} transition-colors`}
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-sm text-[#6B7280]">
                      {line}
                    </p>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Enquiry Form */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Enquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
                Enquiry Form
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827] mb-2">
                Send Us a Message
              </h2>
              <p className="text-[#6B7280] mb-8">
                Fill in the form below and we&apos;ll get back to you within 24
                hours.
              </p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  <p className="text-sm font-medium text-emerald-800">
                    Thank you! Your enquiry has been submitted. We&apos;ll
                    contact you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) =>
                          setFormData({ ...formData, parentName: e.target.value })
                        }
                        placeholder="Full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="parent@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Student Name *
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            studentName: e.target.value,
                          })
                        }
                        placeholder="Student name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Class *
                    </label>
                    <select
                      required
                      value={formData.class}
                      onChange={(e) =>
                        setFormData({ ...formData, class: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    >
                      <option value="">Select class</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1)}>
                          Class {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">
                      Syllabus *
                    </label>
                    <select
                      required
                      value={formData.syllabus}
                      onChange={(e) =>
                        setFormData({ ...formData, syllabus: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="kerala-state">Kerala State</option>
                      <option value="cbse">CBSE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">
                    Message / Enquiry
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your requirements, preferred batch timing, or any questions..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                    <p className="text-sm font-medium text-red-700">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl h-12 px-8 text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Enquiry
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Map + Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block text-sm font-semibold text-[#F97316] uppercase tracking-wider mb-3">
                  Our Location
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827] mb-2">
                  Find Us on the Map
                </h2>
                <p className="text-[#6B7280] mb-6">
                  Visit our learning centre for a campus tour and free
                  consultation.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d15677.621427984453!2d76.00427628111007!3d10.780233459796209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sNaduthodiyil%20building%20Pattambi%20road%20Edappal%20Malappuram%20679576!5e0!3m2!1sen!2sin!4v1783257579236!5m2!1sen!2sin"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kenova Learning Location"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <p className="text-sm font-semibold text-[#111827]">
                    Call for Enquiry
                  </p>
                  <a
                    href="tel:+9100100983"
                    className="text-sm text-[#2563EB] hover:text-[#1E3A8A] font-medium transition-colors"
                  >
                    +91 9100 100 983
                  </a>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5 text-[#10B981]" />
                  </div>
                  <p className="text-sm font-semibold text-[#111827]">
                    WhatsApp Us
                  </p>
                  <a
                    href="https://wa.me/919100100983"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#10B981] hover:text-emerald-700 font-medium transition-colors"
                  >
                    Chat Now
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-2xl p-6 text-white">
                <h3 className="font-heading text-lg font-bold mb-2">
                  Book a Free Demo Class
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Experience our teaching methodology before enrolling. Schedule
                  a free demo class for your child today.
                </p>
                <a
                  href="tel:+919100100983"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call to Book
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
