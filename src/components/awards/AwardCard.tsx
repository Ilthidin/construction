"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Award } from "@/data/awards";

export function AwardCard({
  award,
  index,
}: {
  award: Award;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      >
        <div
          className="group relative h-full cursor-pointer rounded-xl bg-white pt-0 px-0 pb-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          onClick={() => setOpen(true)}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <Image
              src={award.image}
              alt={award.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={60}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Top: Category tag + Year badge */}
          <div className="mb-4 flex items-center justify-between px-8 pt-6">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase text-accent-dark">
              {award.category}
            </span>
            <span className="text-sm font-medium text-muted/60">
              {award.year}
            </span>
          </div>

          {/* Title */}
          <h3 className="px-8 text-xl font-bold text-primary">{award.title}</h3>

          {/* Organization */}
          <p className="mb-3 px-8 text-sm text-muted">{award.organization}</p>

          {/* Description */}
          <p className="px-8 text-sm leading-relaxed text-muted/80">
            {award.description}
          </p>

          {/* Bottom accent border */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl bg-accent/20 transition-colors duration-300 group-hover:bg-accent/40" />
        </div>
      </motion.div>

      {/* Full image popup */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
            onClick={() => setOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="relative max-h-[85vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={award.image}
              alt={award.title}
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 896px"
              quality={60}
              className="rounded-lg object-contain"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white">{award.title}</h3>
              <p className="text-sm text-white/60">
                {award.organization} &middot; {award.year}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
