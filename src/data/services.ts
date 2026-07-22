/**
 * Services data for the construction showcase website.
 * @module data/services
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "commercial",
    title: "Commercial Construction",
    description:
      "From office towers to retail complexes, we deliver commercial spaces that inspire productivity and reflect your brand identity.",
    icon: "Building2",
    image: "/assets/images/service-1.jpg",
    features: [
      "Office Buildings",
      "Retail Complexes",
      "Hotels & Hospitality",
      "Mixed-Use Developments",
    ],
  },
  {
    id: "residential",
    title: "Residential Construction",
    description:
      "Custom homes and residential communities built with precision, comfort, and sustainable living at the forefront.",
    icon: "Home",
    image: "/assets/images/service-2.jpg",
    features: [
      "Custom Homes",
      "Multi-Family Housing",
      "Luxury Estates",
      "Smart Home Integration",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description:
      "Building the foundations of modern communities with roads, bridges, and public utilities that stand the test of time.",
    icon: "Landmark",
    image: "/assets/images/service-3.jpg",
    features: [
      "Bridges & Overpasses",
      "Road Networks",
      "Water Systems",
      "Public Utilities",
    ],
  },
  {
    id: "renovation",
    title: "Renovation & Restoration",
    description:
      "Breathing new life into existing structures with expert renovation that honors the past while embracing the future.",
    icon: "Hammer",
    image: "/assets/images/service-4.jpg",
    features: [
      "Historic Restoration",
      "Modern Upgrades",
      "Seismic Retrofitting",
      "Interior Redesign",
    ],
  },
];
