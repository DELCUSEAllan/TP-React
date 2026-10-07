export default function CatalogueLoading() {
  return (
    <main id="main-content" className="container page-section" aria-busy="true">
      <p className="eyebrow">Catalogue</p>
      <h1>Les cartes arrivent…</h1>
      <div className="skeleton-grid" aria-label="Chargement des cartes">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index} className="skeleton-card" />
        ))}
      </div>
    </main>
  );
}
