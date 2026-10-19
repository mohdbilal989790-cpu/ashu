import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Magnetic, Reveal, TiltCard } from "./motion";
import { BookingForm } from "./BookingForm";
import { WORKS } from "@/data/portfolio";
import heroMobile from "@/assets/hero-mobile.webp";
import heroDesktop from "@/assets/image.webp";
import stylist from "@/assets/stylist.webp";
import pCut from "@/assets/p-cut.webp";
import pBridal from "@/assets/p-bridal.webp";
import pColour from "@/assets/p-colour.webp";
import pEditorial from "@/assets/p-editorial.webp";
import pTransform from "@/assets/p-transform.webp";
import pBlowout from "@/assets/p-blowout.webp";
import sHaircut from "@/assets/s-haircut.webp";
import sBlowout from "@/assets/s-blowout.webp";
import sColour from "@/assets/s-colour.webp";
import sBridal from "@/assets/s-bridal.webp";
import sTreatment from "@/assets/s-treatment.webp";
import sConsultation from "@/assets/s-consultation.webp";
import {
  Instagram as InstagramIcon,
  Mail as MailIcon,
  Youtube as YoutubeIcon,
  MessageCircle as WhatsappIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

/* Ashu hairstylish - Contact & Studio details */
const CONTACT = {
  name: "Ashu hairstylish",
  phone: "+918630818833",
  phoneLabel: "+91 86308 18833",
  whatsapp: "918630818833",
  email: "ashuashu71490@gmail.com",
  instagram: "ashu_hairstylish07",
  instagramUrl: "https://www.instagram.com/ashu_hairstylish07?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==",
  youtube: "@ASHUSALMANII",
  youtubeUrl: "https://www.youtube.com/@ASHUSALMANII",
  location: "Ashu Hair Studio",
  locationUrl: "https://share.google/zRNPgUw63GciHm2Z6",
  hours: [["Mon – Sat", "10:00 – 20:00"], ["Sunday", "10:00 – 19:00"]],
};

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function SectionHead({ eyebrow, title, light }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <Reveal className="mb-8 sm:mb-14 md:mb-20">
      <p className={`eyebrow mb-3 sm:mb-5 ${light ? "opacity-60" : "text-muted-foreground"}`}>{eyebrow}</p>
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
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet={heroDesktop} />
          <img
            src={heroMobile}
            alt="Glossy sculpted hair in dramatic black and white light"
            width={1920}
            height={1088}
            className="animate-slow-zoom h-full w-full object-cover object-[30%_center] md:object-center"
            fetchPriority="high"
          />
        </picture>
      </motion.div>
      <div className="hero-fade absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-6 sm:pb-16 md:pb-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="mb-6 flex flex-wrap items-center gap-3">
          <p className="eyebrow text-silver">Ashu Hairstylish</p>
          <span className="hidden md:inline-block h-1 w-1 rounded-full bg-silver/40" />
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-[0.65rem] font-medium text-pink-300 transition-all hover:border-pink-500/60 hover:bg-pink-500/20 hover:scale-105"
          >
            <InstagramIcon className="h-3 w-3 text-pink-400" />
            <span>100K+ on Instagram</span>
          </a>
        </motion.div>
        <h1 className="font-sans text-[18vw] font-bold leading-[0.82] tracking-tighter md:text-[11rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            >
              THE ART
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="flex items-center flex-wrap gap-2.5 text-chrome md:block md:pl-[12%]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.55, duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span>OF HAIR.</span>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="md:hidden inline-flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-500/20 backdrop-blur-md px-3 py-1 text-[0.65rem] font-sans font-medium tracking-normal text-pink-300 shadow-lg active:scale-95"
              >
                <InstagramIcon className="h-3 w-3 text-pink-400" />
                <span>100K+ on Instagram</span>
              </a>
            </motion.span>
          </span>
        </h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="font-serif text-xl italic text-paper/90 md:text-2xl">Precision. Texture. Transformation.</p>
          <div className="flex flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Magnetic className="flex-1 min-w-0 sm:flex-initial">
              <a
                href="#portfolio"
                className="inline-flex w-full items-center justify-center gap-1.5 sm:gap-3 rounded-full bg-primary px-3 sm:px-7 py-3 sm:py-4 text-[0.62rem] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase text-primary-foreground transition-transform hover:scale-[1.03] text-center whitespace-nowrap"
              >
                <span>Explore My Work</span> <Arrow className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
              </a>
            </Magnetic>
            <Magnetic className="flex-1 min-w-0 sm:flex-initial">
              <a
                href="#contact"
                className="glass inline-flex w-full items-center justify-center gap-1.5 sm:gap-3 rounded-full px-3 sm:px-7 py-3 sm:py-4 text-[0.62rem] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase transition-colors hover:bg-accent text-center whitespace-nowrap"
              >
                <span>Book an Appointment</span>
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

export function Portfolio() {
  const [cat, setCat] = useState("All");
  const items = WORKS.filter((w) => cat === "All" || w.cat === cat);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="portfolio" className="relative mx-auto max-w-7xl px-6 py-7 sm:py-20 md:py-40">
      <div className="mb-4 sm:mb-10 flex flex-col justify-between gap-3 sm:gap-6 md:mb-14 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow mb-3 sm:mb-5 text-muted-foreground">01 — Selected Work & Looks</p>
          <h2 className="font-sans text-5xl font-bold leading-[0.9] tracking-tighter md:text-8xl">PORTFOLIO.</h2>
        </Reveal>
        <Reveal delay={0.1} className="flex items-center gap-3">
          <span className="eyebrow text-[0.65rem] text-muted-foreground mr-2 md:hidden">
            Swipe left karke aur looks dekho
          </span>
          <button
            type="button"
            aria-label="Previous look"
            onClick={() => api?.scrollPrev()}
            className="glass flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next look"
            onClick={() => api?.scrollNext()}
            className="glass flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>
      </div>

      <div role="tablist" aria-label="Filter portfolio" className="-mx-6 mb-4 sm:mb-10 flex gap-2 overflow-x-auto px-6 pb-2">
        {CATS.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-5 py-2.5 eyebrow transition-all ${
              cat === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: items.length > 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6">
          {items.map((w) => (
            <CarouselItem
              key={w.slug}
              className="pl-4 sm:pl-6 basis-[86%] sm:basis-[60%] md:basis-[48%] lg:basis-[36%]"
            >
              <Link
                to="/portfolio/$slug"
                params={{ slug: w.slug }}
                aria-label={`View ${w.title} case study`}
                className="block h-[420px] sm:h-[480px] w-full select-none"
              >
                <TiltCard className="h-full overflow-hidden rounded-2xl border border-white/10 group">
                  <img
                    src={w.img}
                    alt={`${w.title} — ${w.cat}`}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover grayscale-[30%] brightness-90 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 transition-transform duration-500">
                    <p className="eyebrow text-[0.6rem] text-silver">{w.cat}</p>
                    <h3 className="mt-2 font-serif text-2xl sm:text-3xl italic">{w.title}</h3>
                    <p className="mt-3 inline-flex items-center gap-2 eyebrow text-[0.65rem] text-muted-foreground group-hover:text-foreground">
                      Look dekho <Arrow className="transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </TiltCard>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Progress Dots Indicator */}
      {items.length > 1 && (
        <div className="mt-4 sm:mt-8 flex items-center justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to look ${idx + 1}`}
              onClick={() => api?.scrollTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === idx ? "w-8 bg-foreground" : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ───────── ABOUT ───────── */
export function About() {
  return (
    <section id="about" className="section-light relative py-7 sm:py-20 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-14 px-6 md:grid-cols-2 md:gap-20">
        <Reveal className="relative">
          <img
            src={stylist}
            alt="Ashu Hairstylish — Master Stylist"
            loading="lazy"
            width={896}
            height={1152}
            className="aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl object-cover object-top shadow-md"
          />
          <div className="glass-light absolute -bottom-6 right-4 rounded-xl px-6 py-4 md:-right-8 border border-ink/10 shadow-lg">
            <p className="eyebrow text-[0.6rem] opacity-60">Mera Nazariya</p>
            <p className="font-serif text-lg italic">Hair styling ek art hai.</p>
          </div>
        </Reveal>
        <div className="flex flex-col justify-center">
          <SectionHead eyebrow="02 — About The Stylist" title="BEHIND THE CHAIR." light />
          <Reveal delay={0.1}>
            <p className="font-serif text-2xl leading-snug md:text-3xl">
              Har cut ek listening session se shuru hota hai — aapke hair texture, natural movement aur style ko samajh kar.
            </p>
            <p className="mt-6 max-w-lg leading-relaxed opacity-70">
              I'm Ashu Hairstylish! Salon chair pe mera mission sirf baal katna nahi, balki aapko ek fresh, confident aur effortless hair transformation dena hai. Easy-to-manage daily cuts se lekar royal bridal styling tak, har look aapke liye specially tailored hota hai. Mere daily styling tutorials aur transformations dekhne ke liye YouTube & Instagram pe zaroor connect karein!
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 sm:mt-10 grid grid-cols-2 border-t border-ink/15">
            {[
              ["Stylist", CONTACT.name],
              ["Studio", "The Art of Hair Studio"],
              ["Specialty", "Precision Cuts & Hair Art"],
              ["Instagram", "100K+ Community Followers"],
              ["Bookings", "Appointment Only (Advance booking)"],
            ].map(([k, v], i) => (
              <div key={k} className={`border-b border-ink/15 py-3 sm:py-5 ${i % 2 === 0 ? "pr-4" : "border-l border-ink/15 pl-6"}`}>
                <p className="eyebrow text-[0.6rem] opacity-50">{k}</p>
                <p className="mt-1 font-medium">{v}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:bg-pink-600 hover:text-paper hover:scale-[1.02]"
            >
              <InstagramIcon className="h-3.5 w-3.5 text-pink-600" />
              <span>Instagram (100K+)</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="glass inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-all hover:bg-ink hover:text-paper hover:scale-[1.02]"
            >
              <MailIcon className="h-3.5 w-3.5" />
              <span>Gmail</span>
            </a>
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
  {
    t: "Haircuts & Styling",
    d: "Precision cuts tailored to your face shape, texture aur daily lifestyle.",
    price: "From ₹499",
    img: sHaircut,
    i: "M8 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm2.5-9.5L26 24M10.5 21.5L26 8",
  },
  {
    t: "Blowouts & Finishing",
    d: "Glossy, voluminous finish jo salon ke baad bhi dinon tak hold kare.",
    price: "From ₹599",
    img: sBlowout,
    i: "M4 12h14a4 4 0 0 1 0 8H4zM22 16h6M18 20l-2 8h-4l1-8",
  },
  {
    t: "Hair Colour & Highlights",
    d: "Dimensional balayage, global colour aur zero damage tonal refinement.",
    price: "From ₹1,999",
    img: sColour,
    i: "M16 4c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z",
  },
  {
    t: "Bridal & Occasion",
    d: "Weddings aur special events ke liye complete trials aur luxury styling.",
    price: "From ₹3,499",
    img: sBridal,
    i: "M16 6l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L7 13l6-1z",
  },
  {
    t: "Hair Treatments",
    d: "Restorative deep therapy for hair strength, shine aur scalp health.",
    price: "From ₹1,299",
    img: sTreatment,
    i: "M16 4v24M8 10c4 0 8 2 8 6M24 10c-4 0-8 2-8 6M8 20c4 0 8 2 8 6M24 20c-4 0-8 2-8 6",
  },
  {
    t: "Personal Consultations",
    d: "One-on-one custom session aapka next signature look design karne ke liye.",
    price: "From ₹299",
    img: sConsultation,
    i: "M6 8h20v13H14l-6 5v-5H6z",
  },
];

export function Services() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-7 sm:py-20 md:py-40">
      <div className="mb-4 sm:mb-10 flex flex-col justify-between gap-3 sm:gap-6 md:mb-16 md:flex-row md:items-end">
        <Reveal>
          <p className="eyebrow mb-3 sm:mb-5 text-muted-foreground">03 — Studio Services</p>
          <h2 className="font-sans text-5xl font-bold leading-[0.9] tracking-tighter md:text-8xl">SERVICES.</h2>
        </Reveal>
        <Reveal delay={0.1} className="flex items-center gap-3">
          <span className="eyebrow text-[0.65rem] text-muted-foreground mr-2 md:hidden">
            Swipe left karke aur services dekhein
          </span>
          <button
            type="button"
            aria-label="Previous service"
            onClick={() => api?.scrollPrev()}
            className="glass flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={() => api?.scrollNext()}
            className="glass flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6">
          {SERVICES.map((s, i) => (
            <CarouselItem
              key={s.t}
              className="pl-4 sm:pl-6 basis-[86%] sm:basis-[60%] md:basis-[48%] lg:basis-[36%]"
            >
              <TiltCard className="h-full">
                <a
                  href="#contact"
                  className="group glass flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:border-silver/40 hover:bg-accent/60 select-none"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/40">
                    <img
                      src={s.img}
                      alt={s.t}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent" />
                    <span className="absolute top-3 right-3 rounded-full bg-background/80 px-2.5 py-0.5 eyebrow text-[0.6rem] text-foreground backdrop-blur-md">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center gap-3 text-silver">
                      <Icon d={s.i} />
                      <h3 className="font-serif text-2xl">{s.t}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-5 mt-6">
                      <span className="eyebrow text-xs font-semibold text-silver">{s.price}</span>
                      <span className="inline-flex items-center gap-2 eyebrow text-[0.65rem] text-muted-foreground group-hover:text-foreground">
                        Book Karein <Arrow className="transition-transform duration-500 group-hover:translate-x-2" />
                      </span>
                    </div>
                  </div>
                </a>
              </TiltCard>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Progress Dots Indicator */}
      <div className="mt-4 sm:mt-8 flex items-center justify-center gap-2">
        {SERVICES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to service slide ${idx + 1}`}
            onClick={() => api?.scrollTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${current === idx ? "w-8 bg-foreground" : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ───────── SKIN CARE (ONLY ON MOBILE) ───────── */
const SKINCARE_REELS = [
  {
    id: "reel-1",
    label: "Ashu Hairstylish",
    url: "https://www.instagram.com/reel/Dcvnct5vkNe/",
    html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/Dcvnct5vkNe/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/Dcvnct5vkNe/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/Dcvnct5vkNe/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Ashu_hairstylish (@ashu_hairstylish07)</a></p></div></blockquote>`,
  },
  {
    id: "reel-2",
    label: "Junaid Akhtar (@jdunisex)",
    url: "https://www.instagram.com/reel/DW1Jpo_k8Vm/",
    html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DW1Jpo_k8Vm/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DW1Jpo_k8Vm/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DW1Jpo_k8Vm/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Junaid Akhtar (@jdunisex)</a></p></div></blockquote>`,
  },
  {
    id: "reel-3",
    label: "Ashu Hairstylish",
    url: "https://www.instagram.com/reel/DUxjMCyjGkY/",
    html: `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/reel/DUxjMCyjGkY/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/reel/DUxjMCyjGkY/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/reel/DUxjMCyjGkY/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by Ashu_hairstylish (@ashu_hairstylish07)</a></p></div></blockquote>`,
  },
];

export function SkinCare() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const processEmbed = () => {
      const instgrm = (window as unknown as { instgrm?: { Embeds?: { process: () => void } } }).instgrm;
      if (instgrm?.Embeds?.process) {
        instgrm.Embeds.process();
      }
    };

    if (!(window as unknown as { instgrm?: unknown }).instgrm) {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbed;
      document.body.appendChild(script);
    } else {
      processEmbed();
    }
  }, [api]);

  return (
    <section id="skincare" aria-label="Skin Care" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-7 md:hidden">
      <div className="mb-4 flex flex-col justify-between gap-3">
        <Reveal>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs text-pink-400">
            <InstagramIcon className="h-3.5 w-3.5" />
            <span className="font-semibold tracking-wider">Skin Care Reels</span>
          </div>
          <p className="eyebrow mb-1 text-muted-foreground text-[0.65rem]">Studio Skin Care & Grooming</p>
          <h2 className="font-sans text-4xl sm:text-5xl font-bold leading-[0.9] tracking-tighter">SKIN CARE.</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Glowing skin aur fresh facial grooming ke liye studio specialized skin care tips. Swipe karke reels dekhein!
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center justify-between gap-3 pt-1">
          <span className="eyebrow text-[0.65rem] text-muted-foreground">
            Swipe left karke aur reels dekhein
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous reel"
              onClick={() => api?.scrollPrev()}
              className="glass flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:bg-white/10 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next reel"
              onClick={() => api?.scrollNext()}
              className="glass flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-foreground transition-all duration-300 hover:bg-white/10 active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {SKINCARE_REELS.map((item) => (
            <CarouselItem key={item.id} className="pl-3 sm:pl-4 basis-[90%] sm:basis-[80%]">
              <div className="flex flex-col items-center h-full">
                <div className="flex w-full justify-center items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-1.5 sm:p-4 shadow-xl">
                  <div
                    className="w-full max-w-[540px] flex justify-center [&_.instagram-media]:!mx-auto [&_.instagram-media]:!w-full"
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
                </div>

                <div className="mt-3 flex justify-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 eyebrow text-[0.7rem] text-foreground transition-all active:scale-95"
                  >
                    <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
                    <span>Watch on Instagram ({item.label})</span>
                    <Arrow className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Progress Dots Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {SKINCARE_REELS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to reel slide ${idx + 1}`}
            onClick={() => api?.scrollTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === idx ? "w-8 bg-foreground" : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ───────── TESTIMONIALS (HIDDEN ON MOBILE, ACTIVE ON PC) ───────── */
const REVIEWS = [
  {
    quote: "Ashu ne mera hair look completely transform kar diya! Cut ki precision aur finish itni effortless hai ki daily styling super easy lagti hai. Bhai ka haircut skills next-level hai!",
    author: "Rohan Sharma",
    role: "Regular Client — Precision Fade & Styling",
    rating: 5,
  },
  {
    quote: "Best haircut and grooming experience in town! Ashu bhai ne pehle mere face shape aur hair texture ko properly samjha, aur exactly wahi look diya jo mere face par suit karta hai.",
    author: "Aman Verma",
    role: "Hair Transformation Client",
    rating: 5,
  },
  {
    quote: "Unmatched attention to detail! Beard shaping aur texture cut ka balance itna perfect hai ki salon se nikalte hi alag hi confidence feel hota hai. 10/10 recommendation!",
    author: "Kabir Khan",
    role: "Haircut & Beard Sculpting",
    rating: 5,
  },
  {
    quote: "Got my balayage highlights done from Ashu. Zero hair damage and color shade came out 100% natural and glossy. Har koi hair look ki tareef kar raha hai!",
    author: "Pooja Malhotra",
    role: "Hair Colour & Highlights",
    rating: 5,
  },
  {
    quote: "Ashu bhai ka finishing aur styling touch sach mein magical hai. Wedding function ke liye styling karwaya tha, pura din hair set raha without any stiffness!",
    author: "Sameer Sheikh",
    role: "Occasion Styling",
    rating: 5,
  },
  {
    quote: "Finally ek aisa hairstylist mila jo jaldi baazi nahi karta. Har cut par proper time dete hain aur genuine hair care tips bhi share karte hain.",
    author: "Vikram Rajput",
    role: "Studio Regular",
    rating: 5,
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % REVIEWS.length), 6500);
    return () => clearInterval(t);
  }, []);

  const cur = REVIEWS[i] ?? REVIEWS[0]!;

  return (
    <section aria-label="Testimonials" className="section-light hidden md:block py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-6 opacity-60">Verified Client Reviews & Feedback</p>
        
        {/* Star Rating */}
        <div className="mb-6 flex items-center justify-center gap-1.5 text-amber-500">
          {Array.from({ length: cur.rating }).map((_, idx) => (
            <span key={idx} className="text-xl">★</span>
          ))}
        </div>

        <span aria-hidden className="block font-serif text-8xl leading-none md:text-9xl">“</span>
        <div className="relative min-h-[9rem] md:min-h-[8rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="font-serif text-2xl italic leading-snug md:text-3xl text-ink">
                {cur.quote}
              </blockquote>
              <div className="mt-6">
                <p className="font-sans text-base font-semibold tracking-wide text-ink">{cur.author}</p>
                <p className="eyebrow text-[0.65rem] opacity-60 text-ink/70 mt-1">{cur.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-14 flex items-center justify-center gap-6">
          <button aria-label="Previous testimonial" onClick={() => setI((i - 1 + REVIEWS.length) % REVIEWS.length)} className="rounded-full border border-ink/20 p-3 transition-colors hover:bg-ink hover:text-paper">
            <Arrow className="rotate-180" />
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, k) => (
              <button key={k} aria-label={`Testimonial ${k + 1}`} onClick={() => setI(k)} className={`h-px transition-all ${k === i ? "w-10 bg-ink" : "w-5 bg-ink/30"}`} />
            ))}
          </div>
          <button aria-label="Next testimonial" onClick={() => setI((i + 1) % REVIEWS.length)} className="rounded-full border border-ink/20 p-3 transition-colors hover:bg-ink hover:text-paper">
            <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───────── INSTAGRAM & SOCIALS ───────── */
export function Instagram() {
  const tiles = [pEditorial, pCut, pColour, pBridal, pBlowout, pTransform];
  return (
    <section aria-label="Instagram and YouTube" className="py-7 sm:py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-4 sm:mb-8 md:mb-10 flex flex-col justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs text-pink-400">
              <InstagramIcon className="h-3.5 w-3.5" />
              <span className="font-semibold tracking-wider">100K+ Followers on Instagram</span>
            </div>
            <p className="eyebrow mb-2 text-muted-foreground">Follow On Socials</p>
            <h2 className="font-serif text-4xl italic md:text-6xl">Hair In Motion.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-5 py-2.5 eyebrow text-xs text-foreground transition-all duration-300 hover:border-pink-500 hover:bg-pink-500/20 hover:scale-[1.02]"
            >
              <InstagramIcon className="h-4 w-4 text-pink-400" />
              <span>Instagram (100K+)</span>
              <Arrow className="h-3.5 w-3.5" />
            </a>
            <a
              href={CONTACT.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 eyebrow text-xs text-foreground transition-all duration-300 hover:border-red-500/40 hover:bg-white/10 hover:scale-[1.02]"
            >
              <YoutubeIcon className="h-4 w-4 text-red-500" />
              <span>YouTube</span>
              <Arrow className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6">
          {tiles.map((t, k) => (
            <a key={k} href={CONTACT.instagramUrl} target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden" aria-label="View on Instagram">
              <img src={t} alt="" loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-110 group-hover:grayscale-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CONTACT ───────── */
export function Contact() {
  const contactButtons = [
    { label: "Instagram", desc: "DM karein & latest reels", href: CONTACT.instagramUrl, external: true, icon: InstagramIcon, color: "hover:border-pink-500/40 text-pink-400" },
    { label: "Gmail", desc: "Direct mail bhejein", href: `mailto:${CONTACT.email}`, external: false, icon: MailIcon, color: "hover:border-red-400/40 text-red-400" },
    { label: "WhatsApp", desc: "Instant chat & reply", href: `https://wa.me/${CONTACT.whatsapp}`, external: true, icon: WhatsappIcon, color: "hover:border-emerald-400/40 text-emerald-400" },
    { label: "YouTube", desc: "Styling tutorials & transformations", href: CONTACT.youtubeUrl, external: true, icon: YoutubeIcon, color: "hover:border-red-500/40 text-red-500" },
    { label: "Call Studio", desc: "Direct call karke baat karein", href: `tel:${CONTACT.phone}`, external: false, icon: PhoneIcon, color: "hover:border-blue-400/40 text-blue-400" },
    { label: "Location", desc: "Google Maps par visit karein", href: CONTACT.locationUrl, external: true, icon: MapPinIcon, color: "hover:border-amber-400/40 text-amber-400" },
  ];

  return (
    <section id="contact" className="grain relative overflow-hidden border-t border-border py-7 sm:py-20 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="eyebrow mb-3 sm:mb-6 text-muted-foreground">04 — Bookings & Consultations</p>
          <h2 className="font-sans text-[13vw] font-bold leading-[0.85] tracking-tighter md:text-[8.5rem]">
            YOUR NEXT LOOK<br /><span className="font-serif font-normal italic text-chrome">yahan se start hota hai.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-4 sm:mt-10">
          <Magnetic>
            <a href="#book" className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-5 eyebrow text-primary-foreground transition-transform hover:scale-[1.03]">
              Apna Slot Book Karein <Arrow />
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-6 sm:mt-16 md:mt-24 grid gap-6 sm:gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-2 text-muted-foreground">Quick Reach</p>
              <h3 className="font-serif text-3xl italic mb-4 sm:mb-6">Connect with Ashu</h3>
              <p className="text-sm text-muted-foreground mb-5 sm:mb-8 leading-relaxed">
                Kisi bhi query, customized consultation ya direct booking ke liye apne favorite app se connect karein.
              </p>

              {/* Glassy buttons for Instagram, Gmail, WhatsApp, YouTube, Call, Location */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {contactButtons.map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.href}
                    target={btn.external ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`glass group flex items-center gap-3 rounded-2xl border border-white/10 p-3.5 sm:p-4 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] ${btn.color}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 group-hover:bg-white/10">
                      <btn.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="eyebrow text-[0.68rem] text-foreground font-semibold flex items-center justify-between">
                        {btn.label}
                        <Arrow className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{btn.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass mt-5 sm:mt-8 rounded-2xl p-5 sm:p-6 border border-white/10">
              <p className="eyebrow mb-3 sm:mb-4 text-[0.6rem] text-muted-foreground">Studio Timings</p>
              {CONTACT.hours.map(([d, h]) => (
                <div key={d} className="flex justify-between py-1 text-sm"><span>{d}</span><span className="text-muted-foreground">{h}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <a href="/#home" className="font-serif text-2xl italic">Ashu Hairstylish<span className="text-silver">.</span></a>
          <p className="mt-1 eyebrow text-[0.6rem] text-muted-foreground">© {new Date().getFullYear()} — Ashu Hairstylish Studio</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-white/10 hover:border-pink-500/40 hover:scale-[1.02]"
          >
            <InstagramIcon className="h-3.5 w-3.5 text-pink-400" />
            <span>Instagram</span>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-white/10 hover:border-red-400/40 hover:scale-[1.02]"
          >
            <MailIcon className="h-3.5 w-3.5 text-red-400" />
            <span>Gmail</span>
          </a>
          <a
            href={CONTACT.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-white/10 hover:border-red-500/40 hover:scale-[1.02]"
          >
            <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />
            <span>YouTube</span>
          </a>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-white/10 hover:border-emerald-400/40 hover:scale-[1.02]"
          >
            <WhatsappIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
