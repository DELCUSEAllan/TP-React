import { z } from "zod";

const imageSchema = z.string().url().nullish();

export const albumBriefSchema = z.object({
  id: z.number(),
  artistId: z.number(),
  name: z.string().min(1),
  artistName: z.string().min(1),
  imageUrl: imageSchema,
});

export const albumBriefListSchema = z.array(albumBriefSchema);

const trackSchema = z.object({
  trackId: z.number(),
  name: z.string().min(1),
  trackNumber: z.number(),
  durationMillis: z.number(),
  previewUrl: z.string().url().nullish(),
});

export const albumDetailSchema = albumBriefSchema.extend({
  category: z.string().default("Inconnue"),
  trackCount: z.number(),
  price: z.number().nullish(),
  currency: z.string().default("EUR"),
  releaseDate: z.string(),
  copyright: z.string().nullish(),
  tracks: z.array(trackSchema).default([]),
});

export type AlbumBriefDto = z.infer<typeof albumBriefSchema>;
export type AlbumDetailDto = z.infer<typeof albumDetailSchema>;
