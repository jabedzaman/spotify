import { describe, it, expect, vi, beforeEach } from "vitest";
import { SpotifyAuth } from "../src/auth";

describe("SpotifyAuth", () => {
  const mockConfig = {
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    refreshToken: "test-refresh-token",
  };

  describe("constructor", () => {
    it("should create an instance with valid config", () => {
      const auth = new SpotifyAuth(mockConfig);
      expect(auth).toBeInstanceOf(SpotifyAuth);
    });

    it("should throw error if clientId is missing", () => {
      expect(() => new SpotifyAuth({ ...mockConfig, clientId: "" })).toThrow(
        "Missing required authentication credentials"
      );
    });

    it("should throw error if clientSecret is missing", () => {
      expect(
        () => new SpotifyAuth({ ...mockConfig, clientSecret: "" })
      ).toThrow("Missing required authentication credentials");
    });

    it("should throw error if refreshToken is missing", () => {
      expect(
        () => new SpotifyAuth({ ...mockConfig, refreshToken: "" })
      ).toThrow("Missing required authentication credentials");
    });
  });

  describe("getBasicAuthToken", () => {
    it("should return base64 encoded credentials", () => {
      const auth = new SpotifyAuth(mockConfig);
      const token = auth.getBasicAuthToken();

      // Decode the token to verify
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      expect(decoded).toBe("test-client-id:test-client-secret");
    });

    it("should return different tokens for different credentials", () => {
      const auth1 = new SpotifyAuth(mockConfig);
      const auth2 = new SpotifyAuth({
        ...mockConfig,
        clientId: "different-id",
      });

      expect(auth1.getBasicAuthToken()).not.toBe(auth2.getBasicAuthToken());
    });
  });

  describe("getAccessToken", () => {
    beforeEach(() => {
      // Reset fetch mock before each test
      vi.restoreAllMocks();
    });

    it("should return access token on successful request", async () => {
      const mockAccessToken = "mock-access-token";
      const mockResponse = {
        access_token: mockAccessToken,
        token_type: "Bearer",
        expires_in: 3600,
        scope: "user-read-private user-read-email",
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const auth = new SpotifyAuth(mockConfig);
      const token = await auth.getAccessToken();

      expect(token).toBe(mockAccessToken);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("accounts.spotify.com/api/token"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Basic "),
            "Content-Type": "application/x-www-form-urlencoded",
          }),
        })
      );
    });

    it("should throw error when request fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Unauthorized",
      });

      const auth = new SpotifyAuth(mockConfig);

      await expect(auth.getAccessToken()).rejects.toThrow(
        "Failed to get access token"
      );
    });

    it("should throw error when network request fails", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      const auth = new SpotifyAuth(mockConfig);

      await expect(auth.getAccessToken()).rejects.toThrow(
        "Failed to get access token: Network error"
      );
    });

    it("should include refresh token in request body", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ access_token: "token" }),
      });

      const auth = new SpotifyAuth(mockConfig);
      await auth.getAccessToken();

      const fetchCall = vi.mocked(fetch).mock.calls[0];
      const body = fetchCall[1]?.body as string;

      expect(body).toContain("grant_type=refresh_token");
      expect(body).toContain(`refresh_token=${mockConfig.refreshToken}`);
    });
  });
});
