export type AlbumSummary = {
  id: number;
  artistId: number;
  name: string;
  artistName: string;
  imageUrl: string | null;
};

export type TrackDetail = {
  trackId: number;
  name: string;
  trackNumber: number;
  durationMillis: number;
  previewUrl: string | null;
};

export type AlbumDetail = AlbumSummary & {
  category: string;
  trackCount: number;
  price: number | null;
  currency: string;
  releaseDate: string;
  copyright: string | null;
  viewUrl: string;
  tracks: TrackDetail[];
};

export type CatalogQuery = {
  q: string;
  country: string;
  page: number;
};


export type CatalogResult = {
  items: AlbumSummary[];
  resultCount: number;
};

export type FavoriteAlbum = Pick<
  AlbumSummary,
  "id" | "name" | "artistName" | "imageUrl"
>;
