"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

/**
 * Call-to-action section for the home page.
 * Full-width section with background image, dark overlay,
 * and centered content encouraging user engagement.
 *
 * @returns {JSX.Element} The CTA section component
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/assets/images/cta-bg.jpg"
        alt="Construction background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Ready to Build Your Vision?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            From concept to completion, we bring your construction dreams to life
            with precision and excellence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="/contact">
              Start Your Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/contact"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
