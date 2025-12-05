import { TopTrack, Track } from "./interfaces/track";
import { TopArtist, Artist } from "./interfaces/artist";

/**
 * Formats a TopTrack object from Spotify API into a simplified Track object
 * @param track - The TopTrack object to format
 * @returns Formatted Track object
 */
export function formatTrack(track: TopTrack): Track {
  return {
    id: track.id,
    name: track.name,
    href: track.href,
    artists: track.artists.map((artist) => artist.name),
    album: {
      id: track.album.id,
      name: track.album.name,
      uri: track.album.uri,
      release_date: track.album.release_date,
      total_tracks: track.album.total_tracks,
      images: track.album.images,
      artists: track.album.artists.map((artist) => artist.name),
    },
    popularity: track.popularity,
    uri: track.uri,
  };
}

/** * Formats a TopArtist object from Spotify API into a simplified Artist object
 * @param artist - The TopArtist object to format
 * @returns Formatted Artist object
 */
export function formatArtist(artist: TopArtist): Artist {
  return {
    id: artist.id,
    name: artist.name,
    href: artist.href,
    uri: artist.uri,
    images: artist.images,
    followers: artist.followers.total,
  };
}
