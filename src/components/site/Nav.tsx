import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "portfolio", label: "Portfolio" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? "glass" : "border border-transparent"}`}
      >
        <a href="#home" className="font-serif text-xl italic tracking-tight">Atelier<span className="text-silver">.</span></a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 eyebrow transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {active === n.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden rounded-full bg-primary px-5 py-2 eyebrow text-primary-foreground transition-transform hover:scale-105 md:inline-block">Book</a>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-px w-6 bg-foreground transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-foreground transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass mx-auto mt-3 max-w-6xl rounded-3xl p-6 md:hidden"
          >
            <ul className="space-y-1">
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className={`block py-2 font-serif text-3xl ${active === n.id ? "text-foreground" : "text-muted-foreground"}`}>
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-6 block rounded-full bg-primary py-3 text-center eyebrow text-primary-foreground">Book an Appointment</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
