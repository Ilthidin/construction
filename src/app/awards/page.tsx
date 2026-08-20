"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { AwardCard } from "@/components/awards/AwardCard";
import { AwardTimeline } from "@/components/awards/AwardTimeline";
import { useCollection } from "@/hooks/useCollection";
import { awards as fallbackAwards, type Award } from "@/data/awards";

/**
 * Awards page component for the construction showcase website.
 *
 * Features:
 * - Hero section with background image and dark overlay
 * - Grid section displaying all awards in a responsive 3-column layout
 * - Timeline section showcasing the award journey
 * - CTA section encouraging contact
 *
 * @returns The complete Awards page with hero, grid, timeline, and CTA sections
 */
export default function AwardsPage() {
  const { data: awards } = useCollection<Award>("awards", fallbackAwards);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative flex h-[40vh] min-h-screen items-center justify-center">
        {/* Background Image */}
        <Image
          src="/assets/images/award-hero.jpg"
          alt="Awards background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-primary/70" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Awards & Recognition
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          >
            <p className="pt-4 text-sm font-medium text-white/80 md:text-lg lg:text-2xl">
              Our Collection of Achievements
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeader
              subtitle="Recognition"
              title="Our Achievements"
            />
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {awards.map((award, index) => (
              <AwardCard key={award.id} award={award} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeader subtitle="Milestones" title="Our Journey" />
          </motion.div>

          <div className="mt-12">
            <AwardTimeline />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to work with an award-winning team?
            </h2>
            <p className="mb-8 text-lg text-muted">
              Let&apos;s bring your vision to life with the quality and expertise
              that has earned us industry recognition.
            </p>
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
