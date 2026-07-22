/**
 * Blog article data for the construction showcase website.
 * @module data/blog
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "sustainable-construction-2024",
    title: "The Rise of Sustainable Construction in 2024",
    excerpt:
      "Explore how green building practices are transforming the construction industry and why sustainability is no longer optional.",
    image: "/assets/images/blog-1.jpg",
    author: "Sarah Chen",
    date: "March 15, 2024",
    category: "Sustainability",
    readTime: "5 min read",
  },
  {
    id: "ai-in-construction",
    title: "How AI Is Revolutionizing Project Management",
    excerpt:
      "From predictive scheduling to quality control, discover how artificial intelligence is reshaping construction project management.",
    image: "/assets/images/blog-2.jpg",
    author: "James Mitchell",
    date: "February 28, 2024",
    category: "Technology",
    readTime: "7 min read",
  },
  {
    id: "safety-standards",
    title: "Setting New Safety Standards in Construction",
    excerpt:
      "Learn about our approach to maintaining zero-incident worksites and the innovations driving construction safety forward.",
    image: "/assets/images/blog-3.jpg",
    author: "Michael Ross",
    date: "January 10, 2024",
    category: "Safety",
    readTime: "4 min read",
  },
];
