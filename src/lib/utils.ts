import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const DEFAULT_LANGUAGE = 'en-US'

/**
 * A utility function to merge Tailwind CSS classes with other classes.
 *
 * import { clsx, type ClassValue } from 'clsx'
 *
 * import { twMerge } from 'tailwind-merge'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A utility function to format a date string.
 *
 * DEFAULT_LANGUAGE variable is needed
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString(DEFAULT_LANGUAGE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
