import "server-only";
import { env } from "@/lib/env";
import { ExternalApiError } from "./errors";

const REVALIDATE_SECONDS = 60 * 60;

function buildUrl(endpoint: "search" | "lookup", params?: URLSearchParams) {
  const base = env.ITUNES_BASE_URL.replace(/\/\$/, "");

  const url = new URL(`${base}/${endpoint}`);

  if (params) {
    params.set("country", env.ITUNES_COUNTRY);
    url.search = params.toString();
  }

  return url;
}

export async function fetchItunes(
  endpoint: "search" | "lookup",
  params?: URLSearchParams,
): Promise<unknown> {
  const url = buildUrl(endpoint, params);

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new ExternalApiError(
      `iTunes a répondu avec le statut ${response.status}.`,
      response.status,
    );
  }

  return response.json();
}
