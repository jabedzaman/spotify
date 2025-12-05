/**
 * Spotify API endpoints
 * @module endpoints
 */

/**
 * Base URL for Spotify API
 */
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

/**
 * Base URL for Spotify Accounts API
 */
export const SPOTIFY_ACCOUNTS_BASE = "https://accounts.spotify.com";

/**
 * Endpoint for getting user's top tracks
 */
export const TOP_TRACKS_ENDPOINT = `${SPOTIFY_API_BASE}/me/top/tracks`;

/**
 * Endpoint for getting user's top artists
 */
export const TOP_ARTISTS_ENDPOINT = `${SPOTIFY_API_BASE}/me/top/artists`;

/**
 * Endpoint for getting user's recently played tracks
 */
export const RECENTLY_PLAYED_ENDPOINT = `${SPOTIFY_API_BASE}/me/player/recently-played`;

/**
 * Endpoint for obtaining access tokens
 */
export const TOKEN_ENDPOINT = `${SPOTIFY_ACCOUNTS_BASE}/api/token`;

/**
 * Valid time range values for Spotify API requests
 */
export const TIME_RANGES = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
} as const;

export type TimeRange = (typeof TIME_RANGES)[keyof typeof TIME_RANGES];
