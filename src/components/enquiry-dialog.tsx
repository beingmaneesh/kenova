"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Send,
  CheckCircle2,
  User,
  Phone,
  Mail,
  BookOpen,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface EnquiryDialogProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function EnquiryDialog({
  children,
  title = "Book a Free Demo Class",
  subtitle = "Fill in the details and we'll get back to you within 24 hours.",
}: EnquiryDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 3000);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSubmitted(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<button type="button" />} onClick={() => setOpen(true)} className="appearance-none bg-transparent border-0 p-0 m-0 cursor-pointer inline-flex">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-0 shadow-2xl">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-6 rounded-t-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/15 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F97316]/20 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-[#FB923C]" />
                <span className="text-[11px] font-medium text-orange-200">
                  Limited Seats
                </span>
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white font-heading">
                {title}
              </DialogTitle>
              <DialogDescription className="text-blue-200 text-sm">
                {subtitle}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#111827] mb-2">
                Thank You!
              </h3>
              <p className="text-sm text-[#6B7280]">
                Your enquiry has been submitted successfully. We&apos;ll contact
                you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Parent Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentName: e.target.value })
                      }
                      placeholder="Full name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="parent@email.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Student Name *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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
                      placeholder="Name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Class *
                  </label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                  >
                    <option value="">Select</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1)}>
                        Class {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Syllabus *
                  </label>
                  <select
                    required
                    value={formData.syllabus}
                    onChange={(e) =>
                      setFormData({ ...formData, syllabus: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                  >
                    <option value="">Select</option>
                    <option value="kerala">Kerala State</option>
                    <option value="cbse">CBSE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Preferred batch timing, questions..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl h-11 text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Enquiry
              </Button>

              <p className="text-center text-xs text-[#6B7280]">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
