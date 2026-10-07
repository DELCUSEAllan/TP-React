import "server-only";
import { z } from "zod";

const envSchema = z.object({
    ITUNES_BASE_URL: z .string() .url() .default("https://itunes.apple.com"),
    ITUNES_COUNTRY: z

    .string()
    .regex(/^[a-z]{2}$/)
    .default("fr"),
});

export const env = envSchema.parse({
    ITUNES_BASE_URL: process.env.ITUNES_BASE_URL,
    ITUNES_COUNTRY: process.env.ITUNES_COUNTRY,
});
