import type { ReactNode } from "react";

type SectionHeadingProps = {
 eyebrow: string;
 title: string;
 children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
 return (
    <header className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {children ? <div className="section-heading__content">{children}</div> : null}
    </header>
 );
}
