"use client";

import { useState, useTransition, type ReactNode, type FormEvent } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";
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
  CheckCircle2,
  User,
  Phone,
  Mail,
  BookOpen,
  GraduationCap,
  Sparkles,
  Clock,
  Send,
  X,
  MessageCircle,
} from "lucide-react";

const batchSlots = [
  { id: "1", label: "05:45 AM – 06:45 AM", period: "Morning" },
  { id: "2", label: "06:45 AM – 07:45 AM", period: "Morning" },
  { id: "3", label: "05:30 PM – 06:30 PM", period: "Evening" },
  { id: "4", label: "06:30 PM – 07:30 PM", period: "Evening" },
  { id: "5", label: "07:30 PM – 08:30 PM", period: "Evening" },
  { id: "6", label: "08:30 PM – 09:30 PM", period: "Evening" },
  { id: "7", label: "09:00 PM – 10:00 PM", period: "Evening" },
];

const prefLabels = ["1st", "2nd", "3rd"] as const;
const prefColors = [
  "bg-[#F97316] text-white",
  "bg-[#2563EB] text-white",
  "bg-[#1E3A8A] text-white",
];

interface DemoDialogProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function DemoDialog({
  children,
  title = "Book a Free Demo Class",
  subtitle = "Fill in the details and we'll get back to you within 24 hours.",
}: DemoDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    whatsapp: "",
    email: "",
    studentName: "",
    class: "",
    syllabus: "",
    message: "",
  });
  const [batchPrefs, setBatchPrefs] = useState<string[]>([]);

  function toggleBatch(id: string) {
    setBatchPrefs((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function removeBatch(id: string) {
    setBatchPrefs((prev) => prev.filter((p) => p !== id));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (batchPrefs.length < 3) {
      setError("Please select exactly 3 preferred batch slots.");
      return;
    }
    setError("");
    startTransition(async () => {
      const result = await submitEnquiry({
        ...formData,
        batchPreferences: batchPrefs.map((id) => {
          const slot = batchSlots.find((s) => s.id === id)!;
          return `${slot.label} (${slot.period})`;
        }),
      });
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setError("");
        setFormData({
          parentName: "",
          phone: "",
          whatsapp: "",
          email: "",
          studentName: "",
          class: "",
          syllabus: "",
          message: "",
        });
        setBatchPrefs([]);
      }, 200);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={<button type="button" />}
        onClick={() => setOpen(true)}
        className="appearance-none bg-transparent border-0 p-0 m-0 cursor-pointer inline-flex"
      >
        {children}
      </DialogTrigger>
      <DialogContent className="!w-[calc(100%-1.5rem)] sm:!max-w-xl max-h-[90vh] overflow-y-auto overflow-x-hidden !p-0 !gap-0 rounded-2xl !ring-0 shadow-2xl" showCloseButton={false}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-5 rounded-t-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/15 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/25 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F97316]/20 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-[#FB923C]" />
                <span className="text-[11px] font-medium text-orange-200">
                  Free Demo
                </span>
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white font-heading">
                {submitted ? "Enquiry Submitted!" : title}
              </DialogTitle>
              <DialogDescription className="text-blue-200 text-sm">
                {submitted
                  ? "We'll contact you shortly to schedule your demo class."
                  : subtitle}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#111827] mb-2">
                Thank You!
              </h3>
              <p className="text-sm text-[#6B7280] mb-1">
                Your enquiry has been submitted successfully.
              </p>
              <p className="text-sm text-[#6B7280]">
                We&apos;ll contact you within 24 hours to schedule your free
                demo class.
              </p>
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-6 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl h-10 px-6 text-sm font-semibold"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      placeholder="Same as phone"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
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
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      placeholder="Student name"
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
                    Board *
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
                    <option value="kerala-state">Kerala State</option>
                    <option value="cbse">CBSE</option>
                  </select>
                </div>
              </div>

              {/* Batch preferences */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#111827]">
                    <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                    Preferred Batch Slots * (Select 3 Slots)
                  </label>
                  <span className="text-[11px] text-[#6B7280]">
                    {batchPrefs.length}/3 selected
                  </span>
                </div>

                {batchPrefs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {batchPrefs.map((id, idx) => {
                      const slot = batchSlots.find((s) => s.id === id)!;
                      return (
                        <div
                          key={id}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${prefColors[idx]}`}
                        >
                          <span className="opacity-80">{prefLabels[idx]}</span>
                          <span>{slot.label}</span>
                          <button
                            type="button"
                            onClick={() => removeBatch(id)}
                            className="ml-0.5 opacity-70 hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="space-y-1.5">
                  {(["Morning", "Evening"] as const).map((period) => (
                    <div key={period}>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#6B7280] mb-1">
                        {period}
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {batchSlots
                          .filter((s) => s.period === period)
                          .map((slot) => {
                            const prefIdx = batchPrefs.indexOf(slot.id);
                            const isSelected = prefIdx !== -1;
                            const isFull =
                              batchPrefs.length >= 3 && !isSelected;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                disabled={isFull}
                                onClick={() => toggleBatch(slot.id)}
                                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                                  isSelected
                                    ? "border-[#2563EB] bg-blue-50 text-[#1E3A8A]"
                                    : isFull
                                      ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                                      : "border-gray-200 bg-white text-[#111827] hover:border-[#F97316] hover:bg-orange-50/50 cursor-pointer"
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                    isSelected
                                      ? prefColors[prefIdx]
                                      : "border border-gray-300 text-transparent"
                                  }`}
                                >
                                  {isSelected ? prefIdx + 1 : "0"}
                                </div>
                                {slot.label}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-1">
                  Message / Enquiry
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your requirements or any questions..."
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl h-11 text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-lg transition-all disabled:opacity-60"
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
