import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Sections";
import { Reveal } from "@/components/site/motion";
import { WORKS, getWork } from "@/data/portfolio";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.work.title} — The Art of Hair` : "Look not found — The Art of Hair";
    const desc = loaderData?.work.summary ?? "This portfolio look could not be found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="eyebrow text-muted-foreground">404</p>
      <h1 className="font-serif text-4xl italic">This look isn't in the portfolio.</h1>
      <Link to="/" hash="portfolio" className="eyebrow underline underline-offset-8">Back to portfolio</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <Link to="/" className="eyebrow underline underline-offset-8">Something went wrong — go home</Link>
    </div>
  ),
  component: WorkPage,
});

function WorkPage() {
  const { work } = Route.useLoaderData();
  const idx = WORKS.findIndex((w) => w.slug === work.slug);
  const next = WORKS[(idx + 1) % WORKS.length];

  return (
    <main>
      <Nav />
      <section className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-32 md:grid-cols-[1.1fr_1fr] md:gap-16 md:pt-40">
        <motion.div initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="overflow-hidden rounded-sm">
          <img src={work.img} alt={`${work.title} — final result`} width={work.w} height={work.h} className="h-full max-h-[80vh] w-full object-cover" />
        </motion.div>
        <div className="flex flex-col justify-end">
          <Link to="/" hash="portfolio" className="eyebrow mb-10 text-muted-foreground hover:text-foreground">← All work</Link>
          <p className="eyebrow mb-4 text-silver">{work.cat}</p>
          <h1 className="font-sans text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl">{work.title}</h1>
          <p className="mt-6 font-serif text-2xl italic text-paper/80">{work.summary}</p>
          <dl className="mt-10 grid grid-cols-2 border-t border-border">
            <div className="py-5 pr-4"><dt className="eyebrow text-[0.6rem] text-muted-foreground">Time in chair</dt><dd className="mt-1">{work.duration}</dd></div>
            <div className="border-l border-border py-5 pl-6"><dt className="eyebrow text-[0.6rem] text-muted-foreground">Key products</dt><dd className="mt-1">{work.products}</dd></div>
          </dl>
        </div>
      </section>

      <section className="section-light py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1fr_2fr]">
          <Reveal><p className="eyebrow opacity-60">01 — The Brief</p><h2 className="mt-4 font-sans text-4xl font-bold tracking-tighter md:text-5xl">REQUESTED LOOK</h2></Reveal>
          <Reveal delay={0.1}><p className="font-serif text-2xl leading-snug md:text-3xl">“{work.requested}”</p></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal><p className="eyebrow text-muted-foreground">02 — The Process</p><h2 className="mt-4 mb-14 font-sans text-4xl font-bold tracking-tighter md:text-6xl">STYLING PROCESS</h2></Reveal>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {work.process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <li className="glass h-full rounded-sm p-7">
                <span className="font-serif text-5xl italic text-silver">0{i + 1}</span>
                <h3 className="mt-6 eyebrow">{p.step}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="eyebrow text-muted-foreground">03 — Final Result</p>
            <p className="mt-8 font-serif text-3xl italic leading-snug md:text-5xl">{work.result}</p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link to="/" hash="contact" className="rounded-full bg-primary px-7 py-4 eyebrow text-primary-foreground transition-transform hover:scale-[1.03]">Book this look</Link>
              <Link to="/portfolio/$slug" params={{ slug: next.slug }} className="glass rounded-full px-7 py-4 eyebrow">Next: {next.title} →</Link>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </main>
  );
}
