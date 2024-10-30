import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
export function formatDate(date: string, lng: string = 'en-US') {
  return new Date(date).toLocaleDateString(lng, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function createQueryStringFromObject(
  queryObject: Record<string, string | string[]> = {}
): string {
  const queryString = Object.entries(queryObject)
    .flatMap(([key, value]) => {
      const encodedKey = encodeURIComponent(key)
      if (Array.isArray(value)) {
        return value
          .filter((item) => item !== '') // Filter out empty strings
          .map((item) => `${encodedKey}=${encodeURIComponent(item)}`)
      } else if (value !== '') {
        // Only process non-empty strings
        return `${encodedKey}=${encodeURIComponent(value)}`
      }
      return []
    })
    .join('&')
  return queryString ? `?${queryString}` : ''
}

export function createObjectFromQueryString(url: string) {
  const queryObject: Record<string, string | string[]> = {}
  const queryString = url.split('?')[1]
  if (!queryString) return queryObject

  queryString.split('&').forEach((itemString) => {
    const [itemKey, itemValue] = itemString.split('=').map(decodeURIComponent)

    if (queryObject[itemKey]) {
      if (Array.isArray(queryObject[itemKey])) {
        // If the key already exists and is an array, push the new value to the array
        ;(queryObject[itemKey] as string[]).push(itemValue)
      } else {
        // If the key exists but is not an array, convert it to an array and add the new value
        queryObject[itemKey] = [queryObject[itemKey] as string, itemValue]
      }
    } else {
      // If the key does not exist, add it to the object with the value
      queryObject[itemKey] = itemValue
    }
  })

  return queryObject
}
