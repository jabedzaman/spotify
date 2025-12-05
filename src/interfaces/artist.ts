import { ExternalUrls, Image } from "./common";

export interface TopArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: any[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Followers {
  href: any;
  total: number;
}

export interface Artist {
  id: string;
  name: string;
  href: string;
  images: Image[];
  uri: string;
  followers: number;
}
