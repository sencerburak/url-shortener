import shortid from "shortid";

/**
 * Calculates the time to live (TTL) for a URL.
 * @param days - The number of days the URL should be valid. Default is 90 days.
 * @returns The TTL value in seconds.
 */
export function calculateTtl(days = 90): number {
  return Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
}

/**
 * Generates a short URL using shortid library.
 * @returns The generated short URL.
 */
export function generateShortUrl(): string {
  return shortid.generate().slice(0, 7);
}

/**
 * Adds the protocol (http:// or https://) to a URL if it doesn't already have one.
 * @param url - The URL to add the protocol to.
 * @returns The URL with the protocol added.
 */
export function getUrlWithProtocol(url: string): string {
  if (!/^https?:\/\//i.test(url)) {
    return "http://" + url;
  }
  return url;
}
