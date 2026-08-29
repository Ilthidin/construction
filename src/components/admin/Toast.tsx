/**
 * Lightweight toast notification for admin feedback (success/error). Auto
 * dismisses after a short delay. No external dependencies.
 * @module components/admin/Toast
 */

"use client";

import { useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastKind = "success" | "error";

interface ToastProps {
  kind: ToastKind;
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({
  kind,
  message,
  onDismiss,
  duration = 3500,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  const isSuccess = kind === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-3 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg",
        isSuccess ? "bg-green-600" : "bg-red-600"
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
