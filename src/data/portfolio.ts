import pCut from "@/assets/p-cut.jpg";
import pBridal from "@/assets/p-bridal.jpg";
import pColour from "@/assets/p-colour.jpg";
import pEditorial from "@/assets/p-editorial.jpg";
import pTransform from "@/assets/p-transform.jpg";
import pBlowout from "@/assets/p-blowout.jpg";

export type Work = {
  slug: string;
  img: string;
  w: number;
  h: number;
  title: string;
  cat: string;
  span: string;
  summary: string;
  requested: string;
  process: { step: string; detail: string }[];
  result: string;
  duration: string;
  products: string;
};

/* Case-study copy is sample text describing each look — replace with your real client stories. */
export const WORKS: Work[] = [
  {
    slug: "graphic-bob", img: pCut, w: 768, h: 1024, title: "Graphic Bob", cat: "Haircuts & Styling", span: "md:row-span-2",
    summary: "A razor-sharp, chin-length bob with a blunt fringe.",
    requested: "The client wanted to let go of long, heavy layers for something bold and architectural — a clean line that would hold its shape with minimal daily styling.",
    process: [
      { step: "Consultation", detail: "Mapped the jawline and cheekbones to set the exact length and fringe depth." },
      { step: "Sectioning", detail: "Hair was cut wet in fine horizontal sections to build a perfectly weighted perimeter." },
      { step: "Precision cutting", detail: "Blunt club-cutting through the baseline, then a softly graduated nape for movement." },
      { step: "Finishing", detail: "Flat-brush blow-dry and a light gloss serum to show off the line." },
    ],
    result: "A graphic, glossy silhouette that sits perfectly straight and grows out evenly.",
    duration: "90 min", products: "Smoothing cream, shine serum",
  },
  {
    slug: "tonal-balayage", img: pColour, w: 768, h: 1024, title: "Tonal Balayage", cat: "Hair Colour & Highlights", span: "md:row-span-2",
    summary: "Soft, hand-painted dimension with a seamless root melt.",
    requested: "Brightness around the face without harsh stripes or high maintenance — colour that grows out softly over several months.",
    process: [
      { step: "Strand test", detail: "Checked lift and condition to choose the safest lightening approach." },
      { step: "Hand painting", detail: "Freehand balayage concentrated around the face and through the ends." },
      { step: "Root melt", detail: "A shadow root blended the natural base into the lighter lengths." },
      { step: "Gloss & bond care", detail: "Toning gloss for a refined tone, plus a bond-building treatment." },
    ],
    result: "Luminous, lived-in dimension with a soft grow-out and healthy shine.",
    duration: "3.5 hrs", products: "Bond builder, toning gloss",
  },
  {
    slug: "textured-crop", img: pTransform, w: 1024, h: 768, title: "Textured Crop", cat: "Hair Transformations", span: "",
    summary: "From overgrown to a sharp, textured crop with a skin fade.",
    requested: "A modern, low-effort cut that looks intentional every morning with just a little product.",
    process: [
      { step: "Assessment", detail: "Studied growth patterns and crown direction to plan the fade line." },
      { step: "Fade", detail: "Clipper-blended skin fade, kept tight around the ears." },
      { step: "Texturising", detail: "Point-cutting on top to create piecey movement and a short fringe." },
      { step: "Styling", detail: "Matte paste worked through dry for natural texture." },
    ],
    result: "A clean, structured shape with effortless texture on top.",
    duration: "60 min", products: "Matte paste, sea-salt spray",
  },
  {
    slug: "braided-chignon", img: pBridal, w: 768, h: 1024, title: "Braided Chignon", cat: "Bridal Hairstyles", span: "md:row-span-2",
    summary: "A romantic, low braided chignon finished with a delicate pin.",
    requested: "An elegant updo that would last from ceremony to the last dance, soft enough to feel natural with the gown's open back.",
    process: [
      { step: "Bridal trial", detail: "Tested placement, volume and accessories weeks before the day." },
      { step: "Prep", detail: "Heat protectant and a light set for grip and hold." },
      { step: "Braiding", detail: "A loose Dutch braid swept into a low twisted chignon." },
      { step: "Detailing", detail: "Face-framing tendrils pulled out and the hairpiece secured." },
    ],
    result: "A timeless, secure updo that photographed beautifully and held all day.",
    duration: "2 hrs (incl. trial)", products: "Texture spray, flexible-hold spray",
  },
  {
    slug: "sculpted-volume", img: pEditorial, w: 1024, h: 1024, title: "Sculpted Volume", cat: "Editorial & Creative Looks", span: "",
    summary: "An avant-garde sculptural shape for an editorial shoot.",
    requested: "A dramatic, sculptural silhouette that reads strongly in black-and-white photography.",
    process: [
      { step: "Moodboard", detail: "Collaborated with the photographer on shape and lighting." },
      { step: "Foundation", detail: "Backcombed base and hidden padding to build structure." },
      { step: "Sculpting", detail: "Hair smoothed and wrapped into sweeping forms." },
      { step: "On-set", detail: "Constant refinement between frames to keep lines crisp." },
    ],
    result: "A striking, gravity-defying shape built for the camera.",
    duration: "3 hrs on set", products: "Strong-hold spray, pomade",
  },
  {
    slug: "glass-blowout", img: pBlowout, w: 768, h: 1024, title: "Glass Blowout", cat: "Haircuts & Styling", span: "md:row-span-2",
    summary: "A voluminous, bouncy blowout with glossy curled ends.",
    requested: "Big, polished volume for a special evening — movement that would last through the night.",
    process: [
      { step: "Cleanse", detail: "Volumising wash and lightweight conditioner." },
      { step: "Rough dry", detail: "Root lift and mousse to build body." },
      { step: "Round brush", detail: "Section-by-section blow-dry with large round brushes." },
      { step: "Set", detail: "Velcro rollers set while cooling, then brushed out." },
    ],
    result: "Full, glossy, bouncy hair with long-lasting shape.",
    duration: "60 min", products: "Volumising mousse, finishing spray",
  },
];

export const getWork = (slug: string) => WORKS.find((w) => w.slug === slug);
