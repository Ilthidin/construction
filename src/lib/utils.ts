/**
 * Utility functions for the construction showcase website.
 * @module lib/utils
 */

import { type ClassValue, clsx } from "clsx";

/**
 * Merges class names using clsx.
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formats a number with comma separators.
 * @param num - The number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

/**
 * Generates a slug from a string.
 * @param text - The text to slugify
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}
