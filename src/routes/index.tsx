import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero, Portfolio, About, Services, Testimonials, Instagram, Contact, Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Art of Hair — Hairstylist Portfolio" },
      { name: "description", content: "Precision cuts, dimensional colour, bridal and editorial hairstyling. Explore the portfolio and book your appointment." },
      { property: "og:title", content: "The Art of Hair — Hairstylist Portfolio" },
      { property: "og:description", content: "Precision. Texture. Transformation. Luxury hairstyling portfolio and bookings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Testimonials />
      <Instagram />
      <Contact />
      <Footer />
    </main>
  );
}
