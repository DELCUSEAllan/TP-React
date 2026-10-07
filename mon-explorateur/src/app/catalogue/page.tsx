import Image from "next/image";
import Link from "next/link";
import "./catalogue.css";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAlbums } from "@/features/catalog/service";

export const dynamic = "force-dynamic";

type CataloguePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CataloguePage({
  searchParams,
}: CataloguePageProps) {
  const params = await searchParams;
  const recherche = typeof params.q === "string" ? params.q : "";

  const result = await getAlbums({
    q: recherche,
    country: "fr",
    page: 1,
  });

  return (
    <main id="main-content" className="container page-section">
      <SectionHeading
        eyebrow="Catalogue"
        title="Trouvez votre prochain album."
      >
        <p>
          Recherchez un artiste ou un album, puis ouvrez sa fiche.
        </p>
      </SectionHeading>

      <form action="/catalogue" method="get">
        <label htmlFor="recherche">Artiste ou album</label>

        <input
          id="recherche"
          type="search"
          name="q"
          placeholder="Avicii, Coldplay…"
          defaultValue={recherche}
        />

        <button type="submit" className="button button--primary">
          Rechercher
        </button>
      </form>

      {result.items.length > 0 ? (
        <>
          <p className="result-summary" aria-live="polite">
            {result.resultCount} album
            {result.resultCount > 1 ? "s" : ""} trouvé
            {result.resultCount > 1 ? "s" : ""}
          </p>

          <div className="card-grid">
            {result.items.map((album) => (
              <article className="card" key={album.id}>
                <Link href={`/catalogue/${album.id}`}>
                  {album.imageUrl ? (
                    <Image
                      src={album.imageUrl}
                      alt={`Pochette de ${album.name}`}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <p>Pochette indisponible</p>
                  )}

                  <h2>{album.name}</h2>
                  <p>{album.artistName}</p>
                </Link>
              </article>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="Aucun album ne correspond à cette recherche."
          action={
            <Link className="button button--primary" href="/catalogue">
              Effacer la recherche
            </Link>
          }
        >
          <p>Essayez un autre nom d’artiste ou d’album.</p>
        </EmptyState>
      )}
    </main>
  );
}
