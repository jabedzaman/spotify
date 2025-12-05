import type { TimeRange } from "./endpoints";

/**
 * Validates if a time range string is valid
 * @param timeRange - The time range to validate
 * @returns True if the time range is valid
 *
 * @example
 * ```typescript
 * isValidTimeRange('short_term'); // true
 * isValidTimeRange('invalid'); // false
 * ```
 */
export function isValidTimeRange(timeRange: string): timeRange is TimeRange {
  return ["short_term", "medium_term", "long_term"].includes(timeRange);
}

/**
 * Validates if a limit is within acceptable range
 * @param limit - The limit to validate
 * @param min - Minimum allowed value (default: 1)
 * @param max - Maximum allowed value (default: 50)
 * @returns True if the limit is valid
 *
 * @example
 * ```typescript
 * isValidLimit(10); // true
 * isValidLimit(100); // false
 * isValidLimit(0); // false
 * ```
 */
export function isValidLimit(
  limit: number,
  min: number = 1,
  max: number = 50
): boolean {
  return Number.isInteger(limit) && limit >= min && limit <= max;
}

/**
 * Builds a URL with query parameters
 * @param baseUrl - The base URL
 * @param params - Object containing query parameters
 * @returns Complete URL with query parameters
 *
 * @example
 * ```typescript
 * buildUrlWithParams('https://api.spotify.com/v1/me/top/tracks', {
 *   time_range: 'short_term',
 *   limit: '10'
 * });
 * // Returns: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10"
 * ```
 */
export function buildUrlWithParams(
  baseUrl: string,
  params: Record<string, string>
): string {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  return url.toString();
}

/**
 * Creates authorization headers for Spotify API requests
 * @param accessToken - The access token to use
 * @returns Headers object with authorization
 *
 * @example
 * ```typescript
 * const headers = createAuthHeaders('your-access-token');
 * // Returns: { Authorization: 'Bearer your-access-token' }
 * ```
 */
export function createAuthHeaders(accessToken: string): HeadersInit {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
