/**
 * Team member data for the About page.
 * @module data/team
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "james-mitchell",
    name: "James Mitchell",
    role: "Founder & CEO",
    image: "/assets/images/team-1.jpg",
    bio: "Over 25 years of experience in construction and project management. James founded the company with a vision to redefine modern construction.",
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Head of Design",
    image: "/assets/images/team-2.jpg",
    bio: "Award-winning architect with a passion for sustainable design. Sarah leads our design team in creating spaces that inspire.",
  },
  {
    id: "michael-ross",
    name: "Michael Ross",
    role: "Operations Director",
    image: "/assets/images/team-3.jpg",
    bio: "Former military engineer turned construction leader. Michael ensures every project runs on time and within budget.",
  },
  {
    id: "elena-volkov",
    name: "Elena Volkov",
    role: "Sustainability Lead",
    image: "/assets/images/team-4.jpg",
    bio: "Environmental engineer specializing in green building practices. Elena drives our commitment to eco-friendly construction.",
  },
];

export const companyStats = {
  founded: 2010,
  employees: 200,
  projectsCompleted: 120,
  statesServed: 28,
};

export const values = [
  {
    title: "Quality Craftsmanship",
    description:
      "Every detail matters. We take pride in delivering work that exceeds expectations and stands the test of time.",
    icon: "Medal",
  },
  {
    title: "Safety First",
    description:
      "The well-being of our workers and communities is non-negotiable. We maintain the highest safety standards on every site.",
    icon: "Shield",
  },
  {
    title: "Innovation",
    description:
      "We embrace new technologies and methods to build smarter, faster, and more sustainably.",
    icon: "Lightbulb",
  },
  {
    title: "Integrity",
    description:
      "Transparent communication, honest pricing, and ethical practices form the foundation of every relationship.",
    icon: "Handshake",
  },
];
