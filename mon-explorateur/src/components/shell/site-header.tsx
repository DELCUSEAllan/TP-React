import Link from "next/link";

export function SiteHeader() {
 return (
    <header className="site-header">
        <div className="container site-header__inner">
            <Link className="brand" href="/">ITunes</Link>
            <nav aria-label="Navigation principale">
            <Link href="/catalogue">Catalogue</Link>
            <Link href="/favoris">Favoris</Link>
            <Link href="/preferences">Préférences</Link>
            </nav>
        </div>
    </header>
 );
}
