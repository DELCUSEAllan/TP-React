"use client";

import { useEffect } from "react";

type CatalogueErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CatalogueError({ error, reset }: CatalogueErrorProps) {
  useEffect(() => {
    console.error("Erreur du catalogue", error);
  }, [error]);

  return (
    <main id="main-content" className="container page-section">
      <section className="empty-state" role="alert">
        <p className="eyebrow">Service indisponible</p>
        <h1>Impossible de charger les cartes.</h1>
        <p>Vérifiez votre connexion ou réessayez dans quelques instants.</p>
        <button
          className="button button--primary"
          type="button"
          onClick={reset}
        >
          Réessayer
        </button>
      </section>
    </main>
  );
}
