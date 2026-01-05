"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
const ArrowRightIcon = ArrowRight;

/* simple cn helper (no alias issues) */
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) => {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col overflow-hidden rounded-xl",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        className
      )}
    >
      {/* TOP: Title + Description */}
      <div className="p-6 text-left  text-black">
        <h3 className="text-xl  font-semibold text-neutral-900">
          {name}
        </h3>
        <p className="mt-1 max-w-md text-sm text-neutral-600">
          {description}
        </p>
      </div>

      {/* MIDDLE: Image */}
      <div className="relative flex-1 overflow-hidden bg-neutral-50">
        {background}
      </div>

      {/* BOTTOM: CTA (hover same as before) */}
      <div
        className={cn(
          "flex items-center p-4 opacity-0 translate-y-6 transition-all duration-300",
          "group-hover:opacity-100 group-hover:translate-y-0"
        )}
      >
        <a
          href={href}
          className="inline-flex items-center text-sm font-medium text-neutral-900 hover:text-black"
        >
          {cta}
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </div>

      {/* Hover overlay (unchanged behavior) */}
      <div className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-black/[0.03]" />
    </div>
  );
};

