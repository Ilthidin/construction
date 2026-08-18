/**
 * Project data for the construction showcase portfolio.
 * @module data/projects
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
  images: string[];
  area: string;
  duration: string;
  featured: boolean;
}

export const categories = [
  "All",
  "Commercial",
  "Residential",
  "Infrastructure",
  "Renovation",
] as const;

export type Category = (typeof categories)[number];

export const projects: Project[] = [
  {
    id: "skyline-tower",
    title: "Skyline Tower",
    category: "Commercial",
    location: "New York, NY",
    year: "2024",
    description:
      "A 45-story mixed-use development featuring cutting-edge sustainable design and smart building technology throughout.",
    image: "/assets/images/project-1.jpg",
    images: [
      "/assets/images/project-1.jpg",
      "/assets/images/service-1.jpg",
      "/assets/images/team-1.jpg",
      "/assets/images/blog-1.jpg",
    ],
    area: "320,000 sq ft",
    duration: "28 months",
    featured: true,
  },
  {
    id: "harbor-bridge-renovation",
    title: "Harbor Bridge Renovation",
    category: "Infrastructure",
    location: "San Francisco, CA",
    year: "2024",
    description:
      "Complete structural renovation and seismic upgrade of a historic harbor bridge, preserving heritage while ensuring modern safety standards.",
    image: "/assets/images/project-2.jpg",
    images: [
      "/assets/images/project-2.jpg",
      "/assets/images/service-2.jpg",
      "/assets/images/team-2.jpg",
      "/assets/images/blog-2.jpg",
    ],
    area: "1,200 linear ft",
    duration: "18 months",
    featured: true,
  },
  {
    id: "greenfield-estates",
    title: "Greenfield Estates",
    category: "Residential",
    location: "Austin, TX",
    year: "2023",
    description:
      "A luxury residential community of 120 eco-friendly homes with solar integration and community amenities.",
    image: "/assets/images/project-3.jpg",
    images: [
      "/assets/images/project-3.jpg",
      "/assets/images/service-3.jpg",
      "/assets/images/team-3.jpg",
      "/assets/images/blog-3.jpg",
    ],
    area: "45 acres",
    duration: "24 months",
    featured: true,
  },
  {
    id: "metro-convention-center",
    title: "Metro Convention Center",
    category: "Commercial",
    location: "Chicago, IL",
    year: "2023",
    description:
      "State-of-the-art convention center with 500,000 sq ft of exhibition space, advanced acoustics, and LEED Platinum certification.",
    image: "/assets/images/project-4.jpg",
    images: [
      "/assets/images/project-4.jpg",
      "/assets/images/service-4.jpg",
      "/assets/images/team-4.jpg",
    ],
    area: "500,000 sq ft",
    duration: "36 months",
    featured: false,
  },
  {
    id: "riverside-apartments",
    title: "Riverside Apartments",
    category: "Residential",
    location: "Portland, OR",
    year: "2023",
    description:
      "Modern waterfront apartment complex with 200 units, rooftop gardens, and ground-floor retail spaces.",
    image: "/assets/images/project-5.jpg",
    images: [
      "/assets/images/project-5.jpg",
      "/assets/images/service-1.jpg",
      "/assets/images/team-2.jpg",
    ],
    area: "180,000 sq ft",
    duration: "20 months",
    featured: false,
  },
  {
    id: "heritage-hall-restoration",
    title: "Heritage Hall Restoration",
    category: "Renovation",
    location: "Boston, MA",
    year: "2024",
    description:
      "Meticulous restoration of a 19th-century heritage building, converting it into a modern cultural center while preserving original architectural details.",
    image: "/assets/images/project-6.jpg",
    images: [
      "/assets/images/project-6.jpg",
      "/assets/images/service-3.jpg",
      "/assets/images/team-1.jpg",
      "/assets/images/blog-2.jpg",
    ],
    area: "85,000 sq ft",
    duration: "14 months",
    featured: true,
  },
];
