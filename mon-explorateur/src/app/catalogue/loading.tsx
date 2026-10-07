import Link from "next/link";

export default function CatalogueNotFound() {
  return (
    <main id="main-content" className="container page-section">
      <h1>Album introuvable</h1>
      <p>Cet album n’est pas disponible.</p>
      <Link href="/catalogue">Retour au catalogue</Link>
    </main>
  );
}
