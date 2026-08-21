"use client";

import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { type BlogPost } from "@/data/blog";

/**
 * BlogCard Component
 *
 * A card component that displays a blog article preview with image, metadata,
 * title, excerpt, and author information. Features hover animations and
 * staggered entrance animations using Framer Motion.
 *
 * @param {Object} props - Component props
 * @param {BlogPost} props.post - The blog post data to display
 * @param {number} props.index - The index of the card (used for stagger delay)
 *
 * @example
 * <BlogCard post={blogPosts[0]} index={0} />
 */
export function BlogCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Top Row: Category + Read Time */}
          <div className="flex items-center justify-between mb-3">
            <span className="bg-accent/10 text-accent-dark text-xs font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-muted">{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>

          {/* Excerpt */}
          <p className="text-sm text-muted mb-4 line-clamp-3">{post.excerpt}</p>

          {/* Bottom Row: Author + Date */}
          <div className="flex items-center gap-4 text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}
