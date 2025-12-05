import axios, { AxiosError } from "axios";
import { SpotifyAuth, type SpotifyAuthConfig } from "./auth";
import {
  TOP_TRACKS_ENDPOINT,
  TOP_ARTISTS_ENDPOINT,
  RECENTLY_PLAYED_ENDPOINT,
  type TimeRange,
} from "./endpoints";
import {
  buildUrlWithParams,
  createAuthHeaders,
  isValidLimit,
  isValidTimeRange,
} from "./utils";

/**
 * Main Spotify API client for interacting with Spotify's Web API
 * @class Spotify
 *
 * @example
 * ```typescript
 * const spotify = new Spotify({
 *   clientId: process.env.SPOTIFY_CLIENT_ID!,
 *   clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
 *   refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!
 * });
 *
 * // Get top tracks
 * const topTracks = await spotify.getTopTracks('short_term', 10);
 *
 * // Get top artists
 * const topArtists = await spotify.getTopArtists('medium_term', 20);
 *
 * // Get recently played
 * const recentTracks = await spotify.getRecentlyPlayed(15);
 * ```
 */
export class Spotify {
  private auth: SpotifyAuth;

  /**
   * Creates a new Spotify client instance
   * @param config - Authentication configuration containing clientId, clientSecret, and refreshToken
   * @throws {Error} If authentication configuration is invalid
   */
  constructor(config: SpotifyAuthConfig) {
    this.auth = new SpotifyAuth(config);
  }

  /**
   * Legacy constructor support - Creates instance from individual parameters
   * @deprecated Use the config object constructor instead
   * @param clientId - Spotify application client ID
   * @param clientSecret - Spotify application client secret
   * @param refreshToken - User's refresh token
   * @returns Spotify client instance
   *
   * @example
   * ```typescript
   * const spotify = Spotify.create(clientId, clientSecret, refreshToken);
   * ```
   */
  static create(
    clientId: string | null,
    clientSecret: string | null,
    refreshToken: string | null
  ): Spotify {
    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error("Missing required credentials");
    }
    return new Spotify({
      clientId,
      clientSecret,
      refreshToken,
    });
  }

  /**
   * Retrieves the user's top tracks from Spotify
   * @param timeRange - Time range for top tracks ('short_term', 'medium_term', or 'long_term')
   * @param limit - Number of tracks to retrieve (1-50)
   * @returns Promise containing the top tracks data
   * @throws {Error} If the request fails or parameters are invalid
   *
   * @example
   * ```typescript
   * // Get top 20 tracks from the last 4 weeks
   * const tracks = await spotify.getTopTracks('short_term', 20);
   * console.log(tracks.items[0].name); // First track name
   * ```
   */
  async getTopTracks(timeRange: TimeRange, limit: number): Promise<any> {
    if (!isValidTimeRange(timeRange)) {
      throw new Error(
        `Invalid time range: ${timeRange}. Must be 'short_term', 'medium_term', or 'long_term'`
      );
    }
    if (!isValidLimit(limit)) {
      throw new Error(`Invalid limit: ${limit}. Must be between 1 and 50`);
    }

    const accessToken = await this.auth.getAccessToken();
    const url = buildUrlWithParams(TOP_TRACKS_ENDPOINT, {
      time_range: timeRange,
      limit: limit.toString(),
    });

    try {
      const response = await axios.get(url, {
        headers: createAuthHeaders(accessToken),
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `Failed to get top tracks: ${
            error.response?.statusText || error.message
          }`
        );
      }
      throw new Error(
        `Failed to get top tracks: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Retrieves the user's top artists from Spotify
   * @param timeRange - Time range for top artists ('short_term', 'medium_term', or 'long_term')
   * @param limit - Number of artists to retrieve (1-50)
   * @returns Promise containing the top artists data
   * @throws {Error} If the request fails or parameters are invalid
   *
   * @example
   * ```typescript
   * // Get top 10 artists from all time
   * const artists = await spotify.getTopArtists('long_term', 10);
   * console.log(artists.items[0].name); // First artist name
   * ```
   */
  async getTopArtists(timeRange: TimeRange, limit: number): Promise<any> {
    if (!isValidTimeRange(timeRange)) {
      throw new Error(
        `Invalid time range: ${timeRange}. Must be 'short_term', 'medium_term', or 'long_term'`
      );
    }
    if (!isValidLimit(limit)) {
      throw new Error(`Invalid limit: ${limit}. Must be between 1 and 50`);
    }

    const accessToken = await this.auth.getAccessToken();
    const url = buildUrlWithParams(TOP_ARTISTS_ENDPOINT, {
      time_range: timeRange,
      limit: limit.toString(),
    });

    try {
      const response = await axios.get(url, {
        headers: createAuthHeaders(accessToken),
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `Failed to get top artists: ${
            error.response?.statusText || error.message
          }`
        );
      }
      throw new Error(
        `Failed to get top artists: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Retrieves the user's recently played tracks from Spotify
   * @param limit - Number of recently played tracks to retrieve (1-50)
   * @returns Promise containing the recently played tracks data
   * @throws {Error} If the request fails or limit is invalid
   *
   * @example
   * ```typescript
   * // Get last 30 played tracks
   * const recent = await spotify.getRecentlyPlayed(30);
   * recent.items.forEach(item => {
   *   console.log(`${item.track.name} - played at ${item.played_at}`);
   * });
   * ```
   */
  async getRecentlyPlayed(limit: number): Promise<any> {
    if (!isValidLimit(limit)) {
      throw new Error(`Invalid limit: ${limit}. Must be between 1 and 50`);
    }

    const accessToken = await this.auth.getAccessToken();
    const url = buildUrlWithParams(RECENTLY_PLAYED_ENDPOINT, {
      limit: limit.toString(),
    });

    try {
      const response = await axios.get(url, {
        headers: createAuthHeaders(accessToken),
      });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(
          `Failed to get recently played: ${
            error.response?.statusText || error.message
          }`
        );
      }
      throw new Error(
        `Failed to get recently played: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
