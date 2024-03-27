/**
 * Represents an item in the URL mapping.
 */
export interface UrlMappingItem {
  shortUrl: { S: string };
  originalUrl: { S: string };
  ttl: { N: string };
}

/**
 * Represents a custom error with an optional status code.
 */
export interface CustomError extends Error {
  statusCode?: number;
}
