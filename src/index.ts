/**
 * @module @jabedzaman/spotify
 *
 * A TypeScript client for interacting with the Spotify Web API.
 * Provides easy-to-use methods for fetching user's top tracks, top artists,
 * and recently played tracks.
 *
 * @example
 * ```typescript
 * import { Spotify } from '@jabedzaman/spotify';
 *
 * const spotify = new Spotify({
 *   clientId: process.env.SPOTIFY_CLIENT_ID!,
 *   clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
 *   refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!
 * });
 *
 * // Get top tracks from the last 4 weeks
 * const tracks = await spotify.getTopTracks('short_term', 20);
 *
 * // Get all-time top artists
 * const artists = await spotify.getTopArtists('long_term', 10);
 *
 * // Get recently played tracks
 * const recent = await spotify.getRecentlyPlayed(15);
 * ```
 */

// Export main client
export { Spotify } from "./client";

// Export authentication utilities
export {
  SpotifyAuth,
  type SpotifyAuthConfig,
  type TokenResponse,
} from "./auth";

// Export endpoints and constants
export {
  SPOTIFY_API_BASE,
  SPOTIFY_ACCOUNTS_BASE,
  TOP_TRACKS_ENDPOINT,
  TOP_ARTISTS_ENDPOINT,
  RECENTLY_PLAYED_ENDPOINT,
  TOKEN_ENDPOINT,
  TIME_RANGES,
  type TimeRange,
} from "./endpoints";

// Export utility functions
export {
  isValidTimeRange,
  isValidLimit,
  buildUrlWithParams,
  createAuthHeaders,
} from "./utils";

// Export all types
export * from "./types";
