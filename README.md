# @jabedzaman/spotify

TypeScript client for the Spotify Web API. Easily fetch user's top tracks, top artists, and recently played tracks.

## Installation

```bash
npm install @jabedzaman/spotify
# or
pnpm add @jabedzaman/spotify
# or
yarn add @jabedzaman/spotify
```

## Usage

```typescript
import { Spotify } from "@jabedzaman/spotify";

const spotify = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!,
});

// Get top tracks from the last 4 weeks
const topTracks = await spotify.getTopTracks("short_term", 20);
console.log(topTracks.items[0].name);

// Get all-time top artists
const topArtists = await spotify.getTopArtists("long_term", 10);
console.log(topArtists.items[0].name);

// Get recently played tracks
const recentlyPlayed = await spotify.getRecentlyPlayed(15);
console.log(recentlyPlayed.items[0].track.name);
```

## API Reference

### `new Spotify(config)`

Creates a new Spotify client instance.

**Parameters:**

- `config.clientId` (string): Your Spotify application client ID
- `config.clientSecret` (string): Your Spotify application client secret
- `config.refreshToken` (string): User's refresh token

### `spotify.getTopTracks(timeRange, limit)`

Retrieves the user's top tracks.

**Parameters:**

- `timeRange` ('short_term' | 'medium_term' | 'long_term'): Time range for top tracks
  - `short_term`: Last 4 weeks
  - `medium_term`: Last 6 months
  - `long_term`: All time
- `limit` (number): Number of tracks to retrieve (1-50)

**Returns:** Promise containing top tracks data

### `spotify.getTopArtists(timeRange, limit)`

Retrieves the user's top artists.

**Parameters:**

- `timeRange` ('short_term' | 'medium_term' | 'long_term'): Time range for top artists
- `limit` (number): Number of artists to retrieve (1-50)

**Returns:** Promise containing top artists data

### `spotify.getRecentlyPlayed(limit)`

Retrieves the user's recently played tracks.

**Parameters:**

- `limit` (number): Number of tracks to retrieve (1-50)

**Returns:** Promise containing recently played tracks data

## Getting Spotify Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app or select an existing one
3. Note your Client ID and Client Secret
4. Set up redirect URIs in your app settings
5. Use the [Spotify Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow) to obtain a refresh token

## License

MIT

## Author

Jabed Zaman ([@jabedzaman](https://github.com/jabedzaman))

```

```
