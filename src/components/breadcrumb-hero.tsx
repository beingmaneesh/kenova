"use client";

import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbHeroProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function BreadcrumbHero({ title, breadcrumbs }: BreadcrumbHeroProps) {
  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#1E3A8A]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-6 flex items-center justify-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-blue-300" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#F97316] font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full">
          <path
            d="M0 40V20C240 0 480 0 720 20C960 40 1200 40 1440 20V40H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
