"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/awards", label: "Awards" },
  { href: "/about", label: "About" },
];

const services = [
  { href: "/services#commercial", label: "Commercial" },
  { href: "/services#residential", label: "Residential" },
  { href: "/services#infrastructure", label: "Infrastructure" },
  { href: "/services#renovation", label: "Renovation" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

/**
 * Footer component for the Hedgar Construction website.
 *
 * A comprehensive dark-themed footer displayed at the bottom of every page.
 * Features a 4-column responsive grid (1 column on mobile, 2 on sm, 4 on lg)
 * containing company information with social links, quick navigation links,
 * service categories, and full contact details. Includes a bottom bar with
 * copyright information and legal policy links.
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */
export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
                <rect x="4" y="6" width="14" height="48" rx="3" fill="#ffffff"/>
                <rect x="4" y="24" width="52" height="12" rx="3" fill="#ffffff"/>
                <rect x="42" y="6" width="14" height="48" rx="3" fill="#DC2626"/>
              </svg>
              <span className="text-xl font-bold tracking-tight text-white">Hedgar</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Building Tomorrow&apos;s Landmarks Today
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              We craft world-class structures that stand as testaments to innovation, quality, and the vision of our clients.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-sm text-gray-400 transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-gray-400">
                  123 Builder&apos;s Ave, Construction City, CC 12345
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href="tel:+15551234567"
                  className="text-sm text-gray-400 transition-colors hover:text-accent"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href="mailto:info@hedgarconstruction.com"
                  className="text-sm text-gray-400 transition-colors hover:text-accent"
                >
                  info@hedgarconstruction.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            &copy; 2026 Design By Muhammad Syihab. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-gray-500 transition-colors hover:text-gray-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-sm text-gray-500 transition-colors hover:text-gray-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}