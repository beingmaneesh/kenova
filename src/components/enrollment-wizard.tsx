"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
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
  X,
  ArrowRight,
  ArrowLeft,
  School,
  IndianRupee,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  modal: { ondismiss: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface Course {
  id: number;
  board: string;
  durationMonths: number;
  price: number;
  additionalSubjectPrice: number;
}

interface BatchSlot {
  id: number;
  label: string;
  period: string;
}

interface Step1Data {
  parentName: string;
  phone: string;
  whatsapp: string;
  email: string;
  studentName: string;
  studentClass: string;
  schoolName: string;
  board: string;
}

const additionalSubjectsList = [
  "Malayalam",
  "Hindi",
  "Social Science",
  "Arabic" 
];

const prefLabels = ["1st", "2nd", "3rd"] as const;
const prefColors = [
  "bg-[#F97316] text-white",
  "bg-[#2563EB] text-white",
  "bg-[#1E3A8A] text-white",
];

interface EnrollmentWizardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function EnrollmentWizard({
  children,
  title = "Enroll Now",
  subtitle = "Complete your enrollment and pay securely via Razorpay.",
}: EnrollmentWizardProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [batchSlots, setBatchSlots] = useState<BatchSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 form
  const step1Form = useForm<Step1Data>({
    defaultValues: {
      parentName: "",
      phone: "",
      whatsapp: "",
      email: "",
      studentName: "",
      studentClass: "",
      schoolName: "",
      board: "",
    },
  });

  // Step 2 state
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [additionalSubjects, setAdditionalSubjects] = useState<string[]>([]);
  const [batchPrefs, setBatchPrefs] = useState<number[]>([]);

  useEffect(() => {
    if (open && courses.length === 0) {
      fetch("/api/courses")
        .then((r) => r.json())
        .then((data) => {
          if (data.courses) setCourses(data.courses);
          if (data.batchSlots) setBatchSlots(data.batchSlots);
        })
        .catch((err) => console.error("Failed to load courses:", err));
    }
  }, [open, courses.length]);

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== "undefined" && !document.getElementById("razorpay-script")) {
      const s = document.createElement("script");
      s.id = "razorpay-script";
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  const step1Values = step1Form.watch();
  const boardCourses = courses.filter((c) => c.board === step1Values.board);
  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  function calculateTotal() {
    if (!selectedCourse) return 0;
    const base = selectedCourse.price * selectedCourse.durationMonths;
    const extra = selectedCourse.additionalSubjectPrice * additionalSubjects.length * selectedCourse.durationMonths;
    return base + extra;
  }

  function toggleSubject(sub: string) {
    setAdditionalSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  }

  function toggleBatch(id: number) {
    setBatchPrefs((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function removeBatch(id: number) {
    setBatchPrefs((prev) => prev.filter((p) => p !== id));
  }

  const router = useRouter();

  async function handlePayment() {
    if (!selectedCourse) return;
    setError("");
    setLoading(true);

    // Snapshot form data now so the Razorpay callback closure has fresh values
    const payload = {
      parentName: step1Values.parentName,
      phone: step1Values.phone,
      whatsapp: step1Values.whatsapp,
      email: step1Values.email,
      studentName: step1Values.studentName,
      schoolName: step1Values.schoolName,
      studentClass: Number(step1Values.studentClass),
      board: step1Values.board,
      courseId: selectedCourse.id,
      additionalSubjects: [...additionalSubjects],
      batchPreferences: [...batchPrefs],
    };

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      const options: RazorpayOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Kenova Learning",
        description: `Enrollment — Class ${payload.studentClass} (${selectedCourse.durationMonths} months)`,
        prefill: {
          name: payload.parentName,
          email: payload.email,
          contact: payload.phone,
        },
        theme: { color: "#2563EB" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                ...payload,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              router.push(
                `/enrollment/success?student=${encodeURIComponent(payload.studentName)}&amount=${data.amount}`
              );
            } else {
              setError(verifyData.error || "Payment verification failed. Please contact us.");
            }
          } catch {
            setError("Payment verification failed. Please contact us.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTimeout(() => {
        setStep(1);
        setError("");
        setSelectedCourseId(null);
        setAdditionalSubjects([]);
        setBatchPrefs([]);
        step1Form.reset();
      }, 200);
    }
  }

  function canProceedStep2() {
    return selectedCourseId !== null && batchPrefs.length === 3;
  }

  const totalAmount = calculateTotal();
  const stepLabels = ["Details", "Course", "Review"];

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
                  Limited Seats
                </span>
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white font-heading">
                {title}
              </DialogTitle>
              <DialogDescription className="text-blue-200 text-sm">
                {subtitle}
              </DialogDescription>
            </DialogHeader>

            {/* Step indicator */}
            <div className="flex items-center gap-1 mt-4">
              {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-1 flex-1">
                    <div
                      className={`h-1.5 rounded-full flex-1 transition-all ${
                        i + 1 <= step ? "bg-[#F97316]" : "bg-white/20"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium ${
                        i + 1 <= step ? "text-orange-200" : "text-blue-300/50"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* STEP 1: Student & Parent Details */}
          {step === 1 && (
            <form
              onSubmit={step1Form.handleSubmit(() => setStep(2))}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Parent Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...step1Form.register("parentName", { required: true })}
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
                      {...step1Form.register("phone", { required: true, minLength: 10 })}
                      type="tel"
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
                      {...step1Form.register("whatsapp")}
                      type="tel"
                      placeholder="Same as phone"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...step1Form.register("email", { required: true })}
                      type="email"
                      placeholder="parent@email.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Student Name *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...step1Form.register("studentName", { required: true })}
                      placeholder="Student name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    School Name
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      {...step1Form.register("schoolName")}
                      placeholder="School name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Class *
                  </label>
                  <Controller
                    name="studentClass"
                    control={step1Form.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                      >
                        <option value="">Select class</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1)}>
                            Class {i + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-1">
                    Board / Syllabus *
                  </label>
                  <Controller
                    name="board"
                    control={step1Form.control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="kerala">Kerala State</option>
                        <option value="cbse">CBSE</option>
                      </select>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl h-11 text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-lg transition-all mt-2"
              >
                Next: Choose Course
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* STEP 2: Course, Subjects & Batch */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Duration selection */}
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-2">
                  Choose Duration *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {boardCourses.map((course) => {
                    const isSelected = selectedCourseId === course.id;
                    const monthly = course.price / 100;
                    const total = (course.price * course.durationMonths) / 100;
                    return (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? "border-[#F97316] bg-orange-50 ring-2 ring-orange-100"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        {course.durationMonths === 10 && (
                          <span className="absolute -top-2.5 right-2 text-[9px] font-bold bg-[#F97316] text-white px-2 py-0.5 rounded-full">
                            BEST VALUE
                          </span>
                        )}
                        <p className="text-lg font-bold text-[#111827]">
                          {course.durationMonths} <span className="text-xs font-normal text-[#6B7280]">months</span>
                        </p>
                        <p className="text-sm font-semibold text-[#F97316]">
                          ₹{monthly}<span className="text-xs text-[#6B7280]">/mo</span>
                        </p>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">
                          Total: ₹{total.toLocaleString("en-IN")}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {selectedCourse && (
                  <p className="text-xs text-[#6B7280] mt-2">
                    Includes: <span className="font-medium text-[#111827]">Science + Maths + English</span>
                  </p>
                )}
              </div>

              {/* Additional subjects */}
              <div>
                <label className="block text-xs font-semibold text-[#111827] mb-2">
                  Additional Subjects{" "}
                  <span className="font-normal text-[#6B7280]">
                    (₹{boardCourses.length > 0 ? boardCourses[0].additionalSubjectPrice / 100 : "—"}/mo each)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {additionalSubjectsList.map((sub) => {
                    const isSelected = additionalSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                          isSelected
                            ? "border-[#2563EB] bg-blue-50 text-[#1E3A8A]"
                            : "border-gray-200 bg-white text-[#6B7280] hover:border-gray-300"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                        {sub}
                      </button>
                    );
                  })}
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
                          <button type="button" onClick={() => removeBatch(id)} className="ml-0.5 opacity-70 hover:opacity-100">
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
                            const isFull = batchPrefs.length >= 3 && !isSelected;
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
                                    isSelected ? prefColors[prefIdx] : "border border-gray-300 text-transparent"
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

              {/* Navigation */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#6B7280] hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <Button
                  type="button"
                  disabled={!canProceedStep2()}
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl h-11 text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-lg transition-all disabled:opacity-50"
                >
                  Review & Pay
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Pay */}
          {step === 3 && selectedCourse && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Student</span>
                  <span className="font-medium text-[#111827]">{step1Values.studentName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Class</span>
                  <span className="font-medium text-[#111827]">Class {step1Values.studentClass}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Board</span>
                  <span className="font-medium text-[#111827]">
                    {step1Values.board === "kerala" ? "Kerala State" : "CBSE"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Parent</span>
                  <span className="font-medium text-[#111827]">{step1Values.parentName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Phone</span>
                  <span className="font-medium text-[#111827]">{step1Values.phone}</span>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2.5">
                <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider mb-1">Price Breakdown</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">
                    Base (3 subjects) × {selectedCourse.durationMonths}mo
                  </span>
                  <span className="font-medium text-[#111827]">
                    ₹{((selectedCourse.price * selectedCourse.durationMonths) / 100).toLocaleString("en-IN")}
                  </span>
                </div>
                {additionalSubjects.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">
                      +{additionalSubjects.length} subject{additionalSubjects.length > 1 ? "s" : ""} × {selectedCourse.durationMonths}mo
                    </span>
                    <span className="font-medium text-[#111827]">
                      ₹{((selectedCourse.additionalSubjectPrice * additionalSubjects.length * selectedCourse.durationMonths) / 100).toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                {additionalSubjects.length > 0 && (
                  <p className="text-[11px] text-[#6B7280]">
                    {additionalSubjects.join(", ")}
                  </p>
                )}
                <div className="border-t border-gray-100 pt-2 flex justify-between">
                  <span className="text-sm font-bold text-[#111827]">Total</span>
                  <span className="text-lg font-bold text-[#F97316]">
                    ₹{(totalAmount / 100).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Batch preferences */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-[#111827] uppercase tracking-wider">Batch Preferences</h4>
                {batchPrefs.map((id, idx) => {
                  const slot = batchSlots.find((s) => s.id === id)!;
                  return (
                    <div key={id} className="flex items-center gap-2 text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${prefColors[idx]}`}>
                        {prefLabels[idx]}
                      </span>
                      <span className="text-[#111827]">{slot.label} ({slot.period})</span>
                    </div>
                  );
                })}
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              {/* Navigation */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-[#6B7280] hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <Button
                  type="button"
                  disabled={loading}
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white rounded-xl h-12 text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-lg transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <IndianRupee className="w-4 h-4 mr-1" />
                      Pay ₹{(totalAmount / 100).toLocaleString("en-IN")}
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6B7280]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Secured by Razorpay. 100% safe payment.
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
