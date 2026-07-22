"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Props for the AnimatedSection component.
 */
export interface AnimatedSectionProps {
  /** Content to animate into view. */
  children: ReactNode;
  /** Additional CSS classes for the wrapper element. */
  className?: string;
  /** Animation delay in seconds before the animation starts. Default: 0. */
  delay?: number;
  /** Direction from which the content slides in. Default: "up". */
  direction?: "up" | "down" | "left" | "right";
}

const directionOffset: Record<string, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

/**
 * AnimatedSection - A wrapper component that animates its children into view
 * when they scroll into the viewport using framer-motion's `whileInView`.
 *
 * @example
 * ```tsx
 * <AnimatedSection delay={0.2} direction="left">
 *   <p>Hello world</p>
 * </AnimatedSection>
 * ```
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const offset = directionOffset[direction] ?? directionOffset.up;

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
