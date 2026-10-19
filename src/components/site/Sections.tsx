import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Magnetic, Reveal, TiltCard } from "./motion";
import hero from "@/assets/hero.jpg";
import stylist from "@/assets/stylist.jpg";
import pCut from "@/assets/p-cut.jpg";
import pBridal from "@/assets/p-bridal.jpg";
import pColour from "@/assets/p-colour.jpg";
import pEditorial from "@/assets/p-editorial.jpg";
import pTransform from "@/assets/p-transform.jpg";
import pBlowout from "@/assets/p-blowout.jpg";

/* Placeholder contact details — replace with real ones */
const CONTACT = {
  phone: "+910000000000",
  phoneLabel: "+91 00000 00000",
  whatsapp: "910000000000",
  instagram: "yourhandle",
  location: "Your Studio Address, City",
  hours: [["Tue – Fri", "10:00 – 19:00"], ["Saturday", "09:00 – 18:00"], ["Sun – Mon", "Closed"]],
};

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function SectionHead({ eyebrow, title, light }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className={`eyebrow mb-5 ${light ? "opacity-60" : "text-muted-foreground"}`}>{eyebrow}</p>
      <h2 className="font-sans text-5xl font-bold leading-[0.9] tracking-tighter md:text-8xl">{title}</h2>
    </Reveal>
  );
}

/* ───────── HERO ───────── */
export function Hero() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 200]);
  const lines = ["THE ART", "OF HAIR."];
  return (
    <section id="home" className="grain relative flex min-h-[100svh] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={hero} alt="Glossy sculpted long hair in dramatic black and white light" width={1920} height={1088} className="animate-slow-zoom h-full w-full object-cover object-[30%_center]" fetchPriority="high" />
      </motion.div>
      <div className="hero-fade absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-28 md:pb-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="eyebrow mb-6 text-silver">
          Hair Artistry — Portfolio
        </motion.p>
        <h1 className="font-sans text-[18vw] font-bold leading-[0.82] tracking-tighter md:text-[11rem]">
          {lines.map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "text-chrome md:pl-[12%]" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="font-serif text-xl italic text-paper/90 md:text-2xl">Precision. Texture. Transformation.</p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a href="#portfolio" className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 eyebrow text-primary-foreground transition-transform hover:scale-[1.03]">
                Explore My Work <Arrow />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="glass inline-flex items-center gap-3 rounded-full px-7 py-4 eyebrow transition-colors hover:bg-accent">
                Book an Appointment
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
      <a href="#portfolio" aria-label="Scroll to portfolio" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="flex h-10 w-6 justify-center rounded-full border border-foreground/40 pt-2">
          <span className="animate-scroll-dot h-2 w-px bg-foreground" />
        </span>
        <span className="eyebrow text-[0.6rem] text-muted-foreground">Scroll</span>
      </a>
    </section>
  );
}

/* ───────── PORTFOLIO ───────── */
const CATS = ["All", "Haircuts & Styling", "Hair Colour & Highlights", "Bridal Hairstyles", "Hair Transformations", "Editorial & Creative Looks"];
const WORKS = [
  { img: pCut, title: "Graphic Bob", cat: "Haircuts & Styling", span: "md:row-span-2", w: 768, h: 1024 },
  { img: pColour, title: "Tonal Balayage", cat: "Hair Colour & Highlights", span: "md:row-span-2", w: 768, h: 1024 },
  { img: pTransform, title: "Textured Crop", cat: "Hair Transformations", span: "", w: 1024, h: 768 },
  { img: pBridal, title: "Braided Chignon", cat: "Bridal Hairstyles", span: "md:row-span-2", w: 768, h: 1024 },
  { img: pEditorial, title: "Sculpted Volume", cat: "Editorial & Creative Looks", span: "", w: 1024, h: 1024 },
  { img: pBlowout, title: "Glass Blowout", cat: "Haircuts & Styling", span: "md:row-span-2", w: 768, h: 1024 },
];

export function Portfolio() {
  const [cat, setCat] = useState("All");
  const items = WORKS.filter((w) => cat === "All" || w.cat === cat);
  return (
    <section id="portfolio" className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionHead eyebrow="01 — Selected Work" title="PORTFOLIO" />
      <div role="tablist" aria-label="Filter portfolio" className="-mx-6 mb-12 flex gap-2 overflow-x-auto px-6 pb-2">
        {CATS.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-5 py-2.5 eyebrow transition-all ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <motion.div layout className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[220px] md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((w, i) => (
            <motion.div
              key={w.title}
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className={`row-span-2 ${w.span}`}
            >
              <TiltCard className="h-full overflow-hidden rounded-sm">
                <img src={w.img} alt={`${w.title} — ${w.cat}`} loading="lazy" width={w.w} height={w.h} className="h-full w-full object-cover grayscale-[40%] brightness-90 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="eyebrow text-[0.6rem] text-silver">{w.cat}</p>
                  <h3 className="mt-2 font-serif text-2xl italic">{w.title}</h3>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
export function About() {
  return (
    <section id="about" className="section-light relative py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:gap-20">
        <Reveal className="relative">
          <img src={stylist} alt="Portrait of the hairstylist holding scissors in the studio" loading="lazy" width={896} height={1152} className="aspect-[4/5] w-full rounded-sm object-cover" />
          <div className="glass-light absolute -bottom-6 right-4 rounded-sm px-6 py-4 md:-right-8">
            <p className="eyebrow text-[0.6rem] opacity-60">Philosophy</p>
            <p className="font-serif text-lg italic">Hair as architecture.</p>
          </div>
        </Reveal>
        <div className="flex flex-col justify-center">
          <SectionHead eyebrow="02 — About" title="BEHIND THE CHAIR." light />
          <Reveal delay={0.1}>
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              Every cut begins with listening — to the texture, the movement, and the person in the chair.
            </p>
            <p className="mt-6 max-w-lg leading-relaxed opacity-70">
              [Add your bio here — where you trained, how long you've been styling, and what drives your craft. Keep it personal and honest; this is the space clients read before trusting you with their hair.]
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 border-t border-ink/15">
            {[
              ["Experience", "[X] years"],
              ["Based in", "[Your City]"],
              ["Specialty", "Precision cutting"],
              ["Also", "Colour & bridal"],
            ].map(([k, v], i) => (
              <div key={k} className={`border-b border-ink/15 py-5 ${i % 2 === 0 ? "pr-4" : "border-l border-ink/15 pl-6"}`}>
                <p className="eyebrow text-[0.6rem] opacity-50">{k}</p>
                <p className="mt-1 font-medium">{v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── SERVICES ───────── */
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d={d} /></svg>
);
const SERVICES = [
  { t: "Haircuts & Styling", d: "Precision cuts tailored to your face shape, texture and lifestyle.", i: "M8 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm2.5-9.5L26 24M10.5 21.5L26 8" },
  { t: "Blowouts & Finishing", d: "Glossy, voluminous finishes that hold their shape for days.", i: "M4 12h14a4 4 0 0 1 0 8H4zM22 16h6M18 20l-2 8h-4l1-8" },
  { t: "Hair Colour & Highlights", d: "Dimensional colour, balayage and tonal refinement.", i: "M16 4c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z" },
  { t: "Bridal & Occasion", d: "Trials and day-of styling for weddings and events.", i: "M16 6l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L7 13l6-1z" },
  { t: "Hair Treatments", d: "Restorative rituals for strength, shine and scalp health.", i: "M16 4v24M8 10c4 0 8 2 8 6M24 10c-4 0-8 2-8 6M8 20c4 0 8 2 8 6M24 20c-4 0-8 2-8 6" },
  { t: "Personal Consultations", d: "A one-on-one session to design your next look.", i: "M6 8h20v13H14l-6 5v-5H6z" },
];

export function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
      <SectionHead eyebrow="03 — Services" title="THE MENU" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.t} delay={(i % 3) * 0.1}>
            <TiltCard className="h-full">
              <a href="#contact" className="glass flex h-full flex-col rounded-sm p-8 transition-colors hover:bg-accent/60">
                <div className="flex items-start justify-between text-silver">
                  <Icon d={s.i} />
                  <span className="eyebrow text-[0.6rem] text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-10 font-serif text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-6 mt-8">
                  <span className="eyebrow text-[0.65rem]">From ₹ —</span>
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-2" />
                </div>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────── TESTIMONIALS ───────── */
const QUOTES = [
  "Add a real client testimonial here — their words about the experience and the result.",
  "Placeholder for a second genuine review. Replace with feedback you have permission to share.",
  "Placeholder for a third testimonial. Client names appear only once real reviews are added.",
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section aria-label="Testimonials" className="section-light py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-8 opacity-60">Kind Words</p>
        <span aria-hidden className="block font-serif text-8xl leading-none md:text-9xl">“</span>
        <div className="relative min-h-[9rem] md:min-h-[8rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-2xl italic leading-snug md:text-4xl"
            >
              {QUOTES[i]}
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center justify-center gap-6">
          <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + QUOTES.length) % QUOTES.length)} className="rounded-full border border-ink/20 p-3 transition-colors hover:bg-ink hover:text-paper">
            <Arrow className="rotate-180" />
          </button>
          <div className="flex gap-2">
            {QUOTES.map((_, k) => (
              <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className={`h-px transition-all ${k === i ? "w-10 bg-ink" : "w-5 bg-ink/30"}`} />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % QUOTES.length)} className="rounded-full border border-ink/20 p-3 transition-colors hover:bg-ink hover:text-paper">
            <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────── INSTAGRAM ───────── */
export function Instagram() {
  const tiles = [pEditorial, pCut, pColour, pBridal, pBlowout, pTransform];
  return (
    <section aria-label="Instagram" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-muted-foreground">On Instagram</p>
            <h2 className="font-serif text-4xl italic md:text-6xl">@{CONTACT.instagram}</h2>
          </div>
          <a href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 eyebrow underline-offset-8 hover:underline">
            Follow the work <Arrow />
          </a>
        </Reveal>
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
          {tiles.map((t, k) => (
            <a key={k} href={`https://instagram.com/${CONTACT.instagram}`} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden" aria-label="View on Instagram">
              <img src={t} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CONTACT ───────── */
function Field({ label, type = "text", name, textarea }: { label: string; type?: string; name: string; textarea?: boolean }) {
  const cls = "peer w-full border-b border-input bg-transparent pb-3 pt-6 text-lg outline-none transition-colors placeholder-transparent focus:border-foreground";
  return (
    <label className="relative block">
      {textarea ? <textarea name={name} rows={3} placeholder={label} className={cls} required /> : <input name={name} type={type} placeholder={label} className={cls} required />}
      <span className="pointer-events-none absolute left-0 top-1 eyebrow text-[0.6rem] text-muted-foreground transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[0.6rem] peer-focus:uppercase peer-focus:tracking-[0.35em] peer-focus:text-foreground">
        {label}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 peer-focus:w-full" />
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const text = `Hi! I'd like to book an appointment.\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nService: ${f.get("service")}\n${f.get("message")}`;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };
  const links = [
    { k: "WhatsApp", v: "Message me", href: `https://wa.me/${CONTACT.whatsapp}` },
    { k: "Instagram", v: `@${CONTACT.instagram}`, href: `https://instagram.com/${CONTACT.instagram}` },
    { k: "Phone", v: CONTACT.phoneLabel, href: `tel:${CONTACT.phone}` },
    { k: "Location", v: CONTACT.location, href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.location)}` },
  ];
  return (
    <section id="contact" className="grain relative overflow-hidden border-t border-border py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow mb-6 text-muted-foreground">04 — Booking</p>
          <h2 className="font-sans text-[13vw] font-bold leading-[0.85] tracking-tighter md:text-[8.5rem]">
            YOUR NEXT LOOK<br /><span className="font-serif font-normal italic text-chrome">starts here.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Magnetic>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-5 eyebrow text-primary-foreground transition-transform hover:scale-[1.03]">
              Book Your Appointment <Arrow />
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-24 grid gap-16 md:grid-cols-2">
          <Reveal>
            <ul className="divide-y divide-border border-y border-border">
              {links.map((l) => (
                <li key={l.k}>
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between py-5">
                    <span className="eyebrow text-[0.6rem] text-muted-foreground">{l.k}</span>
                    <span className="flex items-center gap-3 text-right">{l.v}<Arrow className="transition-transform group-hover:translate-x-1" /></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="glass mt-8 rounded-sm p-6">
              <p className="eyebrow mb-4 text-[0.6rem] text-muted-foreground">Hours</p>
              {CONTACT.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between py-1.5 text-sm"><span>{d}</span><span className="text-muted-foreground">{h}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {sent ? (
              <div className="glass rounded-sm p-10 text-center">
                <p className="font-serif text-3xl italic">Thank you.</p>
                <p className="mt-3 text-muted-foreground">Your message is ready in WhatsApp — just hit send.</p>
                <button onClick={() => setSent(false)} className="mt-6 eyebrow underline underline-offset-8">Send another</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <Field label="Your name" name="name" />
                <Field label="Phone number" name="phone" type="tel" />
                <Field label="Service of interest" name="service" />
                <Field label="Tell me about your hair goals" name="message" textarea />
                <button type="submit" className="group inline-flex items-center gap-3 rounded-full border border-foreground px-8 py-4 eyebrow transition-colors hover:bg-primary hover:text-primary-foreground">
                  Send Request <Arrow className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <a href="/#home" className="font-serif text-2xl italic">Atelier.</a>
        <p className="eyebrow text-[0.6rem] text-muted-foreground">© {new Date().getFullYear()} — The Art of Hair</p>
      </div>
    </footer>
  );
}
