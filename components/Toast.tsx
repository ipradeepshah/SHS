"use client";
import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-bounce-in max-w-sm">
      <CheckCircle size={18} className="text-green-400 shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white/50 hover:text-white">
        <X size={14} />
      </button>
    </div>
  );
}
