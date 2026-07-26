import type { ReactNode } from 'react';

export default function TrustPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[oklch(0.48_0.08_150)]">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-[oklch(0.24_0.075_155)] md:text-5xl">{title}</h1>
      <p className="mt-5 text-lg leading-8 text-[oklch(0.35_0.065_150)]">{intro}</p>
      <div className="mt-10 space-y-8 text-base leading-7 text-[oklch(0.3_0.055_155)] [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-tight [&_h2]:text-[oklch(0.24_0.075_155)] [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2">
        {children}
      </div>
    </article>
  );
}
