import { Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Hero section component for the home page.
 * Server-rendered with a solid black background that holds for 1 second, then
 * the background video fades in. No static poster is shown.
 *
 * @returns {JSX.Element} The hero section component
 */
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="animate-fade-in-delayed absolute inset-0 h-full w-full object-cover"
        src="/assets/videos/hero.webm"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div
          className="animate-fade-in-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
          style={{ animationDelay: "0.5s" }}
        >
          <Award className="h-4 w-4 text-accent" />
          <span>Trusted Since 2002</span>
        </div>

        <h1
          className="animate-fade-in-auto mb-6 max-w-4xl text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.8s" }}
        >
          Building Tomorrow&apos;s Landmarks Today
        </h1>

        <p
          className="animate-fade-in-auto mb-10 max-w-2xl text-lg text-white/90"
          style={{ animationDelay: "1.0s" }}
        >
          We craft world-class structures that stand as testaments to innovation,
          quality, and the vision of our clients.
        </p>

        <div
          className="animate-fade-in-auto flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "1.2s" }}
        >
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

      <div
        className="animate-fade-in-auto absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ animationDelay: "2.4s" }}
      >
        <span className="text-sm tracking-widest text-white/60 uppercase">
          Scroll Down
        </span>
        <ChevronDown className="animate-bounce-soft h-8 w-8 text-white/60" />
      </div>
    </section>
  );
}
