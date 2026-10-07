import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlbum } from "@/features/catalog/service";

export const dynamic = "force-dynamic";

type AlbumPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;
  const identifiant = Number(id);

  if (!Number.isSafeInteger(identifiant) || identifiant <= 0) {
    notFound();
  }

  const album = await getAlbum(identifiant);

  if (!album) {
    notFound();
  }

  return (
    <main id="main-content" className="container page-section">
      <Link href="/catalogue">← Retour au catalogue</Link>

      <section>
        {album.imageUrl ? (
          <Image
            src={album.imageUrl}
            alt={`Pochette de ${album.name}`}
            width={200}
            height={200}
          />
        ) : null}

        <h1>{album.name}</h1>
        <p>{album.artistName}</p>
        <p>Genre : {album.category}</p>
        <p>{album.trackCount} morceaux</p>

        <p>
          Sortie :{" "}
          {new Date(album.releaseDate).toLocaleDateString("fr-FR", {
            timeZone: "UTC",
          })}
        </p>

        <a
          href={album.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--primary"
        >
          Voir sur Apple Music / iTunes
        </a>
      </section>

      <section>
        <h2>Les morceaux</h2>

        {album.tracks.length > 0 ? (
          <ol>
            {album.tracks.map((morceau) => (
              <li key={morceau.trackId}>{morceau.name}</li>
            ))}
          </ol>
        ) : (
          <p>Aucun morceau disponible.</p>
        )}
      </section>
    </main>
  );
}
