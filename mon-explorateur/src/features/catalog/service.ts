import "server-only";
import { z } from "zod";
import { ExternalApiError, InvalidApiDataError } from "./errors";
import { fetchItunes } from "./api";
import { toAlbumDetail, toAlbumSummary } from "./mappers";
import { albumBriefListSchema, albumDetailSchema } from "./schemas";
import type {
  AlbumDetail,
  AlbumSummary,
  CatalogQuery,
  CatalogResult,
} from "./types";

const PAGE_SIZE = 20;

function parseOrThrow<T>(result: z.ZodSafeParseResult<T>): T {
  if (!result.success) {
    throw new InvalidApiDataError(
      `La réponse iTunes ne respecte pas le contrat attendu : ${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}

export async function getAlbums(
  query: CatalogQuery,
): Promise<CatalogResult> {
  const params = new URLSearchParams({
    entity: "album",
    media: "music",
    limit: String(PAGE_SIZE),
  });

  const artistes = query.q
    ? [query.q]
    : ["Avicii", "Martin Garrix", "Coldplay", "David Guetta"];

  const json = {
    results: [] as Record<string, unknown>[],
  };

  for (const artiste of artistes) {
    params.set("term", artiste);

    const reponse = await fetchItunes("search", params);

    if (
      reponse &&
      typeof reponse === "object" &&
      "results" in reponse &&
      Array.isArray(reponse.results)
    ) {
      const albums = reponse.results as Record<string, unknown>[];

      json.results.push(
        ...albums.filter(
          (album) => query.q || album.artistName === artiste,
        ),
      );
    }
  }

  const validatedAlbums = parseOrThrow(
    albumBriefListSchema.safeParse(
      json.results.map((album) => ({
        id: album.collectionId,
        artistId: album.artistId,
        name: album.collectionName,
        artistName: album.artistName,
        imageUrl: album.artworkUrl100 ?? null,
      })),
    ),
  );

  return {
    items: validatedAlbums.map(toAlbumSummary),
    resultCount: validatedAlbums.length,
  };
}

export async function getAlbumDetails(
  collectionId: number,
): Promise<AlbumDetail> {
  const params = new URLSearchParams({
    id: String(collectionId),
    entity: "song",
  });

  const json = await fetchItunes("lookup", params);

  const rawResults =
    json && typeof json === "object" && "results" in json
      ? (json.results as Record<string, unknown>[])
      : [];

  if (rawResults.length === 0) {
    throw new InvalidApiDataError(
      "Aucun album trouvé avec cet identifiant.",
    );
  }

  const albumData = rawResults.find(
    (item) => item.wrapperType === "collection",
  );

  const songsData = rawResults.filter(
    (item) => item.wrapperType === "track",
  );

  if (!albumData) {
    throw new InvalidApiDataError(
      "Impossible de récupérer les détails de l'album.",
    );
  }

  const fullAlbumPayload = {
    ...albumData,

    id: albumData.collectionId,
    name: albumData.collectionName,
    imageUrl: albumData.artworkUrl100 ?? null,
    category: albumData.primaryGenreName,
    price: albumData.collectionPrice,

    tracks: songsData.map((song) => ({
      trackId: song.trackId,
      name: song.trackName,
      trackNumber: song.trackNumber,
      durationMillis: song.trackTimeMillis,
      previewUrl: song.previewUrl,
    })),
  };

  const validatedDetail = parseOrThrow(
    albumDetailSchema.safeParse(fullAlbumPayload),
  );

  return toAlbumDetail(validatedDetail);
}

export async function getAlbum(
  id: number,
): Promise<AlbumDetail | null> {
  try {
    return await getAlbumDetails(id);
  } catch (error) {
    if (error instanceof ExternalApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function getFeaturedAlbums(): Promise<AlbumSummary[]> {
  const result = await getAlbums({
    q: "",
    country: "fr",
    page: 1,
  });

  return result.items.slice(0, 4);
}
