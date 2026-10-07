import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import Image from "next/image";

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero__grid">
          <SectionHeading
            eyebrow="Projet guide Next.js"
            title="Votre collection de musique commence ici."
          >
            <p>Explorez les cartes versions musiques ! Observez les détails des albums et gardez les dans votre collection. Bon amusement.</p>
            <div className="actions">
              <Link className="button button--primary" href="/catalogue">
                Explorer le catalogue
              </Link>
              <Link className="button button--secondary" href="/favoris">
                Voir mes favoris
              </Link>
            </div>
          </SectionHeading>

          <Image
            className="hero-card-image"
            src="/carte-ITunes.webp"
            alt="Carte iTunes Musique"
            width={280}
            height={400}
            />
        </div>
      </section>

      <section
        className="container page-section"
        aria-labelledby="project-title"
      >
        <p className="eyebrow">Le projet</p>
        <h2 id="project-title" className="display-title">
          Une API réelle, une interface vivante.
        </h2>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Rechercher</h3>
            <p>
              Les critères sont conservés dans l’URL et peuvent être partagés.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Observer</h3>
            <p>
              Chaque carte réagit au pointeur avec une profondeur calculée en
              direct.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Conserver</h3>
            <p>
              Les favoris sont partagés entre les écrans et persistent
              localement.
            </p>
          </article>
        </div>
      </section>

      <section className="container showcase" aria-labelledby="showcase-title">
        <div>
          <p className="eyebrow">Sélection rapide</p>
          <h2 id="showcase-title" className="display-title">
            Quatre recherches pour commencer.
          </h2>
        </div>
        <div className="showcase__links">
          <Link href="/catalogue?q=Pikachu">
            <span>David Guetta</span>
            <strong>Électro</strong>
          </Link>
          <Link href="/catalogue?q=Dracaufeu">
            <span>Coldplay</span>
            <strong>Commercial</strong>
          </Link>
          <Link href="/catalogue?q=Mewtwo">
            <span>EDM</span>
            <strong>Martin Garrix</strong>
          </Link>
          <Link href="/catalogue?q=Evoli">
            <span>EDM</span>
            <strong>Avicii</strong>
          </Link>
        </div>
      </section>

      <div className="container">
      </div>
    </main>
  );
}
