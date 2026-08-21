/**
 * Home page for the Hedgar Construction showcase website.
 * Features hero section, featured projects, statistics, services preview, and CTA.
 *
 * Below-the-fold sections are dynamically imported so their client JS
 * (framer-motion variants, ProjectModal, data fetching) is code-split out of
 * the initial route bundle instead of being parsed up front.
 * @module app/page
 */

import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";

const FeaturedProjects = dynamic(
  () => import("@/components/home/FeaturedProjects").then((m) => m.FeaturedProjects)
);
const ServicesPreview = dynamic(
  () => import("@/components/home/ServicesPreview").then((m) => m.ServicesPreview)
);
const CTA = dynamic(() => import("@/components/home/CTA").then((m) => m.CTA));

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
