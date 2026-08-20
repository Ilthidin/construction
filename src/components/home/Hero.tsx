"use client";

import { Award, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * Hero section component for the home page.
 * Displays a full-screen hero with background video, overlay,
 * animated content, and call-to-action buttons.
 *
 * @returns {JSX.Element} The hero section component
 */
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/videos/hero.webm"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
        >
          <Award className="h-4 w-4 text-accent" />
          <span>Trusted Since 2002</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 max-w-4xl text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Building Tomorrow&apos;s Landmarks Today
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-10 max-w-2xl text-lg text-white/80"
        >
          We craft world-class structures that stand as testaments to innovation,
          quality, and the vision of our clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button variant="primary" size="lg" href="/projects">
            View Our Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/contact"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Get a Quote
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
