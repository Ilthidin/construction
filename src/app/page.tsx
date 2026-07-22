/**
 * Home page for the Hedgar Construction showcase website.
 * Features hero section, featured projects, statistics, services preview, and CTA.
 * @module app/page
 */

import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Stats } from "@/components/home/Stats";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { CTA } from "@/components/home/CTA";

/**
 * The main landing page combining all home sections
 * into a cohesive construction company showcase.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Stats />
      <ServicesPreview />
      <CTA />
    </>
  );
}
