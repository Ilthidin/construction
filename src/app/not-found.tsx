import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NotFoundMarker } from "@/components/layout/NotFoundMarker";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-surface px-4 py-20">
      <NotFoundMarker />
      <div className="text-center">
        <p className="text-7xl font-bold text-accent md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-primary md:text-3xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you are looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Main Page
        </Link>
      </div>
    </main>
  );
}
