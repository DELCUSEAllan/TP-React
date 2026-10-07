import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/shell/site-header";
import { SiteFooter } from "@/components/shell/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Musique Album",
    template: "%s | Musique Album"
  },
  description: "Explorez les albums et découvrez des morceaux de musique avec une interface interactive.", // 👈 Modifié ici
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <a className="skip-link" href="#main-content">
          Aller au contenu
        </a>
        <SiteHeader/>
        {children}
        <SiteFooter/>
      </body>
    </html>
  );
}
