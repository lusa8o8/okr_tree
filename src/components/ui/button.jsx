import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-slate-950 text-white hover:bg-slate-800 focus-visible:ring-slate-400",
  outline: "border border-slate-200 bg-white text-slate-950 hover:bg-slate-50 focus-visible:ring-slate-300",
};

export function Button({ className, variant = "default", type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}
