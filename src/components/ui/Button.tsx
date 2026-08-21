"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

/**
 * Props shared between button and link rendering modes.
 */
interface ButtonBaseProps {
  /** Content inside the button. */
  children: ReactNode;
  /** Visual style variant. Default: "primary". */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size preset. Default: "md". */
  size?: "sm" | "md" | "lg";
  /** Optional URL. When provided, renders as a Next.js Link (internal) or anchor (external). */
  href?: string;
  /** Additional CSS classes. */
  className?: string;
  /** Click handler (button mode only). */
  onClick?: () => void;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { href?: undefined };
type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<string, string> = {
  primary: "bg-accent text-primary hover:bg-accent-light",
  secondary: "bg-primary text-white hover:bg-primary-light",
  outline: "border-2 border-accent-dark text-accent-dark hover:bg-accent-dark hover:text-white",
  ghost: "text-primary hover:text-accent-dark",
};

const sizeStyles: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Button - A versatile button component supporting multiple visual variants and
 * sizes. Automatically renders as a Next.js `<Link>` when an internal `href` is
 * provided, or as a native `<a>` for external URLs.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" href="/contact">
 *   Get a Quote
 * </Button>
 *
 * <Button variant="outline" onClick={() => alert("Clicked!")}>
 *   Learn More
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      variant = "primary",
      size = "md",
      href,
      className = "",
      ...rest
    } = props;

    const baseClasses = [
      "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg",
      variantStyles[variant],
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { onClick, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

      if (href.startsWith("/")) {
        return (
          <Link
            href={href}
            className={baseClasses}
            ref={ref as React.Ref<HTMLAnchorElement>}
            {...anchorRest}
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorRest}
        >
          {children}
        </a>
      );
    }

    const { ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        className={baseClasses}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonRest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
