import { Spotify } from "./dist/index";

const spotify = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!,
});

async function main() {
  const topArtists = await spotify.getTopArtists("long_term", 1);

  console.log(JSON.stringify(topArtists, null, 2));
}

main().catch(console.error);
