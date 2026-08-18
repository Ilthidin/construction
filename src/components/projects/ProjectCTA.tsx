"use client";

import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function ProjectCTA() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <h2 className="text-3xl font-bold md:text-5xl">
            Make Great Projects With Us
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg">
            Ready to bring your vision to life? Let&apos;s collaborate and build something
            extraordinary together.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="primary" size="lg" href="/contact" className="group">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
