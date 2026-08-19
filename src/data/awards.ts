/**
 * Awards data for the construction showcase website.
 * @module data/awards
 */

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  category: string;
  image: string;
}

export const awards: Award[] = [
  {
    id: "leed-platinum",
    title: "LEED Platinum Certification",
    organization: "U.S. Green Building Council",
    year: "2024",
    description:
      "Awarded for Skyline Tower's exceptional sustainability features including net-zero energy design and rainwater harvesting systems.",
    category: "Sustainability",
    image: "/assets/images/project-1.jpg",
  },
  {
    id: "best-general-contractor",
    title: "Best General Contractor",
    organization: "Construction Excellence Awards",
    year: "2024",
    description:
      "Recognized for outstanding project management, safety record, and client satisfaction across multiple large-scale projects.",
    category: "Excellence",
    image: "/assets/images/project-2.jpg",
  },
  {
    id: "innovation-award",
    title: "Construction Innovation Award",
    organization: "National Building Society",
    year: "2023",
    description:
      "Honored for pioneering the use of 3D printing technology and AI-driven project management in commercial construction.",
    category: "Innovation",
    image: "/assets/images/project-3.jpg",
  },
  {
    id: "heritage-preservation",
    title: "Heritage Preservation Excellence",
    organization: "Historic Preservation Foundation",
    year: "2023",
    description:
      "Awarded for the meticulous restoration of Heritage Hall, blending modern functionality with 19th-century architectural integrity.",
    category: "Restoration",
    image: "/assets/images/project-4.jpg",
  },
  {
    id: "safety-excellence",
    title: "Safety Excellence Award",
    organization: "Occupational Safety Council",
    year: "2024",
    description:
      "Zero-incident record maintained across 15 active construction sites with over 2,000 workers for three consecutive years.",
    category: "Safety",
    image: "/assets/images/project-5.jpg",
  },
  {
    id: "community-impact",
    title: "Community Impact Award",
    organization: "Urban Development Institute",
    year: "2023",
    description:
      "Recognized for affordable housing initiatives and community development programs in underserved neighborhoods.",
    category: "Community",
    image: "/assets/images/project-6.jpg",
  },
];
