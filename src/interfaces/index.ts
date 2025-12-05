export interface SpotifyResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  next: string;
  previous: any;
}
