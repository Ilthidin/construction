"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeader } from "@/components/ui/SectionHeader";

const faqs = [
  {
    question: "What types of construction projects do you handle?",
    answer:
      "We specialize in commercial, residential, infrastructure, and renovation projects. From office buildings and retail spaces to custom homes and public infrastructure, our team has the expertise to deliver projects of any scale.",
  },
  {
    question: "How long does a typical project take to complete?",
    answer:
      "Project timelines vary depending on scope and complexity. A small renovation may take 4-8 weeks, while a commercial build can take 6-18 months. We provide a detailed timeline during the proposal phase and keep you updated throughout construction.",
  },
  {
    question: "Do you provide free estimates?",
    answer:
      "Yes, we offer complimentary initial consultations and estimates for all potential projects. Our team will assess your requirements, discuss options, and provide a transparent, detailed quote with no hidden costs.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. Hedgar Construction is fully licensed, bonded, and insured. We carry comprehensive general liability and workers' compensation coverage to protect our clients and employees at every project site.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "We stand behind our work with a comprehensive warranty covering structural elements and craftsmanship. Specific terms vary by project, but all clients receive documentation outlining coverage details before construction begins.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            subtitle="FAQ"
            title="Frequently Asked Questions"
            center
          />
        </AnimatedSection>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <AnimatedSection key={faq.question} delay={index * 0.05} direction="up">
                <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50"
                  >
                    <span className="text-base font-semibold text-primary">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
