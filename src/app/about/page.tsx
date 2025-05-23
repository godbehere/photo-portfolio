import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'About | Lost Light Photography',
  description: 'Learn more about the story and vision behind Lost Light Photography.',
  openGraph: {
    title: 'About | Lost Light Photography',
    description: 'Learn more about the story and vision behind Lost Light Photography.',
    url: 'https://photography.lostlight.ca/about',
    images: ['https://photography.lostlight.ca/images/about-me1.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Lost Light Photography',
    description: 'Learn more about the story and vision behind Lost Light Photography.',
    images: ['https://photography.lostlight.ca/images/about-me1.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-10">
      <h1 className="text-4xl font-bold text-center">About Me</h1>

      {/* Main Image */}
      <div className="relative w-full h-100 rounded-xl overflow-hidden shadow-md">
        <Image
          src="/images/about-me1.jpg"
          alt="Portrait of the photographer"
          fill
          className="object-cover"
        />
      </div>

      {/* Text Content */}
      <div className="space-y-6 text-lg text-muted-foreground">
        <p>
          Hi, I’m Grant Godbehere, the photographer behind Lost Light Photography, based in Toronto.
        </p>
        <p>
          I got into photography through my travels, and it really took hold while exploring the Peruvian Amazon. The wildlife and scenery made me realize how quickly moments can pass — and how powerful it is to capture them before they’re gone. That’s what Lost Light means to me: preserving moments that might otherwise fade away.
        </p>
        <p>
          I’m a self-taught photographer with a background in travel and candid photography. Over time, that’s grown into a passion for working with people — whether it’s families, individuals, pets, or events. My goal is always the same: to capture real moments, as they are.
        </p>
        <p>
          I don’t stick to one specific style. I focus on finding what’s honest and meaningful in each shoot — whether it’s something soft and quiet, or spontaneous and full of energy. I offer a range of sessions and custom packages, and I’m always happy to adapt to your needs.
        </p>
        <p>
          During our time together, I want you to feel comfortable, relaxed, and free to be yourself. No pressure — just real moments, thoughtfully captured.
        </p>
      </div>

      {/* Optional Additional Image */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md">
        <Image
          src="/images/about-me3.jpg" // Optional second image
          alt="Behind the scenes"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
