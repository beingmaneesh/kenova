"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (tooltip) {
      const timer = setTimeout(() => setTooltip(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [tooltip]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {tooltip && (
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-4 max-w-[220px] animate-in fade-in slide-in-from-right-4 duration-300">
          <button
            type="button"
            onClick={() => setTooltip(false)}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-sm font-semibold text-[#111827] mb-0.5">
            Need help?
          </p>
          <p className="text-xs text-[#6B7280]">
            Chat with us on WhatsApp for quick enquiries!
          </p>
          <div className="absolute bottom-4 -right-2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-[-45deg]" />
        </div>
      )}
      <a
        href="https://wa.me/919495000086?text=Hi%20Kenova%20Learning%2C%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
        target="_blank"
        rel="noopener noreferrer"
        className="group w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 flex items-center justify-center transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>
    </div>
  );
}
