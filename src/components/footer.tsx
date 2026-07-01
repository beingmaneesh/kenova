"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  BookOpen,
  Video,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const courses = [
  "Classes 1–4",
  "Classes 5–7",
  "Classes 8–10",
  "Kerala State Syllabus",
  "CBSE Curriculum",
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              {/* <Image
                src="/images/logo.png"
                alt="Kenova Learning"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              /> */}
              <div className="flex flex-col">
                <span className="text-lg font-bold font-heading leading-tight">
                  <span className="text-white">Kenova</span>{" "}
                  <span className="text-[#F97316]">Learning</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Learn with Confidence. Excel with Knowledge. Expert tuition for
              Classes 1–10 in Kerala State & CBSE curriculum.
            </p>
            <div className="flex gap-3">
              {[Globe, BookOpen, Video].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F97316] flex items-center justify-center transition-colors group"
                  aria-label="Social media"
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#F97316] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">
              Courses
            </h4>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c} className="text-sm text-gray-400">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-white mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  Kenova Learning Centre, Kerala, India
                </span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#F97316] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#10B981] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@kenovalearning.com"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#F97316] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  info@kenovalearning.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Kenova Learning. All rights
              reserved.
            </p>
            <p className="text-sm text-[#F97316]">
              Learn Today, Lead Tomorrow.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
