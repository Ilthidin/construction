import Image from "next/image";
import { Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero section component for the home page.
 * Server-rendered: the headline paints immediately without client JS or
 * opacity keyframes (LCP-safe). Mobile gets a static image instead of the
 * video; desktop keeps the background video.
 *
 * @returns {JSX.Element} The hero section component
 */
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Mobile: lightweight static image instead of video */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/assets/images/hero-poster.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Desktop: background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/images/hero-poster.webp"
        preload="metadata"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src="/assets/videos/hero.webm"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          <Award className="h-4 w-4 text-accent" />
          <span>Trusted Since 2002</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Building Tomorrow&apos;s Landmarks Today
        </h1>

        <p className="mb-10 max-w-2xl text-lg text-white/90">
          We craft world-class structures that stand as testaments to innovation,
          quality, and the vision of our clients.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="primary" size="lg" href="/projects">
            View Our Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/contact"
            className="border-white bg-black/30 text-white hover:bg-white hover:text-primary"
          >
            Get a Quote
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ChevronDown className="animate-bounce-soft h-8 w-8 text-white/60" />
      </div>
    </section>
  );
}
