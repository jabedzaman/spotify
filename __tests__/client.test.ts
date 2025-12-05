import { describe, it, expect, vi, beforeEach } from "vitest";
import { Spotify } from "../src/client";

describe("Spotify Client", () => {
  const mockConfig = {
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    refreshToken: "test-refresh-token",
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("constructor", () => {
    it("should create an instance with valid config", () => {
      const spotify = new Spotify(mockConfig);
      expect(spotify).toBeInstanceOf(Spotify);
    });

    it("should throw error if config is invalid", () => {
      expect(() => new Spotify({ ...mockConfig, clientId: "" })).toThrow();
    });
  });

  describe("create (legacy)", () => {
    it("should create instance from individual parameters", () => {
      const spotify = Spotify.create(
        mockConfig.clientId,
        mockConfig.clientSecret,
        mockConfig.refreshToken
      );
      expect(spotify).toBeInstanceOf(Spotify);
    });

    it("should throw error if clientId is null", () => {
      expect(() =>
        Spotify.create(null, mockConfig.clientSecret, mockConfig.refreshToken)
      ).toThrow("Missing required credentials");
    });

    it("should throw error if clientSecret is null", () => {
      expect(() =>
        Spotify.create(mockConfig.clientId, null, mockConfig.refreshToken)
      ).toThrow("Missing required credentials");
    });

    it("should throw error if refreshToken is null", () => {
      expect(() =>
        Spotify.create(mockConfig.clientId, mockConfig.clientSecret, null)
      ).toThrow("Missing required credentials");
    });
  });

  describe("getTopTracks", () => {
    it("should fetch top tracks successfully", async () => {
      const mockTracks = {
        items: [
          {
            id: "1",
            name: "Test Track",
            artists: [{ name: "Test Artist" }],
          },
        ],
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockTracks,
        });

      const spotify = new Spotify(mockConfig);
      const tracks = await spotify.getTopTracks("short_term", 10);

      expect(tracks).toEqual(mockTracks);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("should throw error for invalid time range", async () => {
      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopTracks("invalid" as any, 10)).rejects.toThrow(
        "Invalid time range"
      );
    });

    it("should throw error for invalid limit", async () => {
      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopTracks("short_term", 100)).rejects.toThrow(
        "Invalid limit"
      );
    });

    it("should throw error for negative limit", async () => {
      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopTracks("short_term", -1)).rejects.toThrow(
        "Invalid limit"
      );
    });

    it("should throw error when API request fails", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          statusText: "Bad Request",
        });

      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopTracks("short_term", 10)).rejects.toThrow(
        "Failed to get top tracks"
      );
    });
  });

  describe("getTopArtists", () => {
    it("should fetch top artists successfully", async () => {
      const mockArtists = {
        items: [
          {
            id: "1",
            name: "Test Artist",
            genres: ["pop", "rock"],
          },
        ],
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockArtists,
        });

      const spotify = new Spotify(mockConfig);
      const artists = await spotify.getTopArtists("medium_term", 20);

      expect(artists).toEqual(mockArtists);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("should throw error for invalid time range", async () => {
      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopArtists("invalid" as any, 10)).rejects.toThrow(
        "Invalid time range"
      );
    });

    it("should throw error for invalid limit", async () => {
      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopArtists("long_term", 0)).rejects.toThrow(
        "Invalid limit"
      );
    });

    it("should throw error when API request fails", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          statusText: "Unauthorized",
        });

      const spotify = new Spotify(mockConfig);

      await expect(spotify.getTopArtists("short_term", 10)).rejects.toThrow(
        "Failed to get top artists"
      );
    });
  });

  describe("getRecentlyPlayed", () => {
    it("should fetch recently played tracks successfully", async () => {
      const mockRecentTracks = {
        items: [
          {
            track: {
              id: "1",
              name: "Recent Track",
            },
            played_at: "2023-01-01T00:00:00Z",
          },
        ],
      };

      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockRecentTracks,
        });

      const spotify = new Spotify(mockConfig);
      const recent = await spotify.getRecentlyPlayed(15);

      expect(recent).toEqual(mockRecentTracks);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("should throw error for invalid limit", async () => {
      const spotify = new Spotify(mockConfig);

      await expect(spotify.getRecentlyPlayed(51)).rejects.toThrow(
        "Invalid limit"
      );
    });

    it("should throw error when API request fails", async () => {
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ access_token: "mock-token" }),
        })
        .mockResolvedValueOnce({
          ok: false,
          statusText: "Service Unavailable",
        });

      const spotify = new Spotify(mockConfig);

      await expect(spotify.getRecentlyPlayed(10)).rejects.toThrow(
        "Failed to get recently played"
      );
    });
  });
});
