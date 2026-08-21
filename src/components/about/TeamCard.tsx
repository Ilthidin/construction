"use client";

import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { TeamMember } from "@/data/team";

/**
 * Props for the TeamCard component.
 */
export interface TeamCardProps {
  /** The team member data to display. */
  member: TeamMember;
  /** Numeric index used to calculate a staggered animation delay. */
  index: number;
}

/**
 * TeamCard - Renders a single team member as a card with an image, bio, and
 * social links. The image scales on hover for a subtle interactive effect.
 * Animation delay is staggered by the provided index.
 *
 * @example
 * ```tsx
 * <TeamCard member={teamMembers[0]} index={0} />
 * ```
 */
export function TeamCard({ member, index }: TeamCardProps) {
  const socialLinks = [
    { label: "LinkedIn" },
    { label: "Twitter" },
    { label: "Email" },
  ];

  return (
    <AnimatedSection delay={index * 0.1} direction="up">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary">{member.name}</h3>
          <p className="mt-1 text-sm font-medium uppercase tracking-wider text-accent-dark">
            {member.role}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
            {member.bio}
          </p>

          {/* Social links */}
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map(({ label }) => (
              <button
                key={label}
                aria-label={`${member.name} ${label}`}
                className="flex h-9 items-center justify-center rounded-full border border-gray-200 px-3 text-xs text-gray-400 transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
