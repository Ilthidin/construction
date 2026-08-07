"use client";

import Image from "next/image";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useCollection } from "@/hooks/useCollection";
import { blogPosts as fallbackBlogPosts, type BlogPost } from "@/data/blog";

/**
 * Blog Page
 *
 * The blog listing page featuring a hero section with a background image
 * and a responsive grid of blog post cards. Each card uses staggered
 * entrance animations for a polished visual experience.
 *
 * @example
 * <BlogPage />
 */
export default function BlogPage() {
  const { data: blogPosts } = useCollection<BlogPost>("blog", fallbackBlogPosts);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="/images/blog-1.jpg"
          alt="Blog"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            News &amp; Insights
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Stay updated with the latest trends and insights in construction
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <SectionHeader subtitle="Blog" title="Latest Articles" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
