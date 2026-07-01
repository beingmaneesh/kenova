"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { EnquiryDialog } from "@/components/enquiry-dialog";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  solid?: boolean;
}

export function Navbar({ solid = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || solid
          ? "bg-white backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo1.png"
              alt="Kenova Learning"
              width={300}
              height={70}
              className="   object-contain"
              priority
            />
            {/* <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl font-bold leading-tight">
                <span className="text-[#1E3A8A]">Kenova</span>{" "}
                <span className="text-[#F97316]">Learning</span>
              </span>
            </div> */}
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 xl:px-4 py-2 text-sm font-medium text-[#6B7280] hover:text-[#F97316] transition-colors rounded-lg hover:bg-orange-50/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <EnquiryDialog title="Admissions Open" subtitle="Secure your child's seat — fill in the details below.">
              <span
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl px-6 h-11 text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
                )}
              >
                Admissions Open
              </span>
            </EnquiryDialog>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-orange-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-[#111827]" />
            ) : (
              <Menu className="w-6 h-6 text-[#111827]" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-[#111827] hover:text-[#F97316] hover:bg-orange-50 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <EnquiryDialog title="Admissions Open" subtitle="Secure your child's seat — fill in the details below.">
                  <span
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-xl h-12 text-base font-semibold cursor-pointer"
                    )}
                  >
                    Admissions Open
                  </span>
                </EnquiryDialog>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
