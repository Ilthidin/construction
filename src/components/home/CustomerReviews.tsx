"use client";

import { Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reviews = [
  {
    name: "Sarah Mitchell",
    role: "CEO, Mitchell Enterprises",
    rating: 5,
    text: "Hedgar Construction delivered our new headquarters on time and under budget. Their attention to detail and professionalism exceeded our expectations.",
  },
  {
    name: "James Rodriguez",
    role: "Director of Operations, CityView Properties",
    rating: 5,
    text: "Working with Hedgar was a seamless experience. They transformed our outdated facility into a modern workspace that our team loves.",
  },
  {
    name: "Emily Chen",
    role: "Project Manager, Urban Development Corp",
    rating: 5,
    text: "The quality of craftsmanship and clear communication throughout our project made Hedgar the ideal partner for our renovation.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-accent text-accent" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export function CustomerReviews() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            subtitle="Testimonials"
            title="What Our Clients Say"
            center
          />
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <AnimatedSection key={review.name} delay={index * 0.1} direction="up">
              <div className="flex h-full flex-col rounded-xl bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <StarRating rating={review.rating} />
                <p className="mt-4 flex-1 text-base leading-relaxed text-gray-600">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-primary">
                      {review.name}
                    </div>
                    <div className="text-xs text-muted">{review.role}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
