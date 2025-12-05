import { TOKEN_ENDPOINT } from "./endpoints";

/**
 * Configuration for Spotify authentication
 */
export interface SpotifyAuthConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

/**
 * Response from Spotify token endpoint
 */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

/**
 * Handles Spotify authentication and token management
 * @class SpotifyAuth
 *
 * @example
 * ```typescript
 * const auth = new SpotifyAuth({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   refreshToken: 'your-refresh-token'
 * });
 *
 * const accessToken = await auth.getAccessToken();
 * ```
 */
export class SpotifyAuth {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;

  /**
   * Creates a new SpotifyAuth instance
   * @param config - Authentication configuration
   * @throws {Error} If any required credential is missing
   */
  constructor(config: SpotifyAuthConfig) {
    if (!config.clientId || !config.clientSecret || !config.refreshToken) {
      throw new Error("Missing required authentication credentials");
    }
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.refreshToken = config.refreshToken;
  }

  /**
   * Generates a Basic Authentication token from client credentials
   * @returns Base64 encoded authorization token
   *
   * @example
   * ```typescript
   * const basicToken = auth.getBasicAuthToken();
   * // Returns: "Base64EncodedString"
   * ```
   */
  getBasicAuthToken(): string {
    const token = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      "base64"
    );
    return token;
  }

  /**
   * Retrieves a new access token using the refresh token
   * @returns Promise that resolves to an access token
   * @throws {Error} If the token request fails
   *
   * @example
   * ```typescript
   * try {
   *   const accessToken = await auth.getAccessToken();
   *   console.log('Access token:', accessToken);
   * } catch (error) {
   *   console.error('Failed to get access token:', error);
   * }
   * ```
   */
  async getAccessToken(): Promise<string> {
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", this.refreshToken);

    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Basic ${this.getBasicAuthToken()}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.statusText}`);
      }

      const data = (await response.json()) as TokenResponse;
      return data.access_token;
    } catch (error) {
      throw new Error(
        `Failed to get access token: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}
