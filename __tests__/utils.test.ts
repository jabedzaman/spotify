import { describe, it, expect } from "vitest";
import {
  isValidTimeRange,
  isValidLimit,
  buildUrlWithParams,
  createAuthHeaders,
} from "../src/utils";

describe("Utils", () => {
  describe("isValidTimeRange", () => {
    it("should return true for valid time ranges", () => {
      expect(isValidTimeRange("short_term")).toBe(true);
      expect(isValidTimeRange("medium_term")).toBe(true);
      expect(isValidTimeRange("long_term")).toBe(true);
    });

    it("should return false for invalid time ranges", () => {
      expect(isValidTimeRange("invalid")).toBe(false);
      expect(isValidTimeRange("SHORT_TERM")).toBe(false);
      expect(isValidTimeRange("")).toBe(false);
      expect(isValidTimeRange("short-term")).toBe(false);
    });
  });

  describe("isValidLimit", () => {
    it("should return true for valid limits (default range)", () => {
      expect(isValidLimit(1)).toBe(true);
      expect(isValidLimit(25)).toBe(true);
      expect(isValidLimit(50)).toBe(true);
    });

    it("should return false for invalid limits (default range)", () => {
      expect(isValidLimit(0)).toBe(false);
      expect(isValidLimit(51)).toBe(false);
      expect(isValidLimit(-1)).toBe(false);
      expect(isValidLimit(100)).toBe(false);
    });

    it("should return false for non-integer limits", () => {
      expect(isValidLimit(1.5)).toBe(false);
      expect(isValidLimit(10.99)).toBe(false);
    });

    it("should respect custom min and max", () => {
      expect(isValidLimit(5, 1, 10)).toBe(true);
      expect(isValidLimit(11, 1, 10)).toBe(false);
      expect(isValidLimit(0, 1, 10)).toBe(false);

      expect(isValidLimit(100, 50, 200)).toBe(true);
      expect(isValidLimit(49, 50, 200)).toBe(false);
    });
  });

  describe("buildUrlWithParams", () => {
    it("should build URL with query parameters", () => {
      const baseUrl = "https://api.spotify.com/v1/me/top/tracks";
      const params = {
        time_range: "short_term",
        limit: "10",
      };

      const result = buildUrlWithParams(baseUrl, params);

      expect(result).toContain(baseUrl);
      expect(result).toContain("time_range=short_term");
      expect(result).toContain("limit=10");
    });

    it("should handle empty parameters", () => {
      const baseUrl = "https://api.spotify.com/v1/me/top/tracks";
      const params = {};

      const result = buildUrlWithParams(baseUrl, params);

      expect(result).toBe(baseUrl);
    });

    it("should handle multiple parameters", () => {
      const baseUrl = "https://api.spotify.com/v1/me/top/artists";
      const params = {
        time_range: "long_term",
        limit: "20",
        offset: "5",
      };

      const result = buildUrlWithParams(baseUrl, params);

      expect(result).toContain("time_range=long_term");
      expect(result).toContain("limit=20");
      expect(result).toContain("offset=5");
    });

    it("should properly encode special characters", () => {
      const baseUrl = "https://api.example.com/search";
      const params = {
        query: "hello world",
        type: "track,artist",
      };

      const result = buildUrlWithParams(baseUrl, params);

      expect(result).toContain("hello+world");
    });
  });

  describe("createAuthHeaders", () => {
    it("should create authorization headers", () => {
      const token = "mock-access-token";
      const headers = createAuthHeaders(token);

      expect(headers).toEqual({
        Authorization: "Bearer mock-access-token",
      });
    });

    it("should handle different token formats", () => {
      const token = "BQC4...xyz123";
      const headers = createAuthHeaders(token);

      expect(headers).toEqual({
        Authorization: `Bearer ${token}`,
      });
    });

    it("should handle empty token", () => {
      const token = "";
      const headers = createAuthHeaders(token);

      expect(headers).toEqual({
        Authorization: "Bearer ",
      });
    });
  });
});
