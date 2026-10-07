import type { AlbumDetail, AlbumSummary, TrackDetail } from "./types";
import type { AlbumBriefDto, AlbumDetailDto } from "./schemas";

export function toAlbumSummary(albumDto: AlbumBriefDto): AlbumSummary {
  return {
    id: albumDto.id,
    artistId: albumDto.artistId,
    name: albumDto.name,
    artistName: albumDto.artistName,
    imageUrl: albumDto.imageUrl ?? null,
  };
}

export function toAlbumDetail(albumDetailDto: AlbumDetailDto): AlbumDetail {
  return {
    ...toAlbumSummary(albumDetailDto),
    category: albumDetailDto.category,
    trackCount: albumDetailDto.trackCount,
    price: albumDetailDto.price ?? null,
    currency: albumDetailDto.currency,
    releaseDate: albumDetailDto.releaseDate,
    copyright: albumDetailDto.copyright ?? null,
    viewUrl: albumDetailDto.collectionViewUrl,
    tracks: albumDetailDto.tracks.map((track) => ({
      trackId: track.trackId,
      name: track.name,
      trackNumber: track.trackNumber,
      durationMillis: track.durationMillis,
      previewUrl: track.previewUrl ?? null,
    })),
  };
}
