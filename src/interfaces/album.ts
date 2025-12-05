import { Image } from "./common";

export interface Album {
  id: string;
  name: string;
  uri: string;
  release_date: string;
  total_tracks: number;
  images: Image[];
  artists: string[];
}
