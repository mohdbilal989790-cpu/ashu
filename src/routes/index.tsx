import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero, Portfolio, About, Services, SkinCare, Testimonials, Instagram, Contact, Footer } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashu Hairstylish — The Art of Hair Studio" },
      { name: "description", content: "Precision cuts, transformations, styling & hair treatments by Ashu Hairstylish. Connect on Instagram @ashu_hairstylish07 & YouTube @ASHUSALMANII." },
      { property: "og:title", content: "Ashu Hairstylish — The Art of Hair Studio" },
      { property: "og:description", content: "Precision. Texture. Transformation. Luxury hair artistry portfolio and bookings by Ashu Hairstylish." },
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
      <SkinCare />
      <Testimonials />
      <Instagram />
      <Contact />
      <Footer />
    </main>
  );
}
