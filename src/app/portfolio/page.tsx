import PortfolioGallery from "@/components/PortfolioComponent";
import { Suspense } from "react";

export const metadata = {
  title: 'Portfolio | Lost Light Photography',
  description: 'Explore a curated collection of professional photography showcasing landscapes, portraits, and events.',
  openGraph: {
    title: 'Portfolio | Lost Light Photography',
    description: 'Explore a curated collection of professional photography showcasing landscapes, portraits, and events.',
    url: 'https://photography.lostlight.ca/portfolio',
    siteName: 'Lost Light Photography',
    images: [
      {
        url: '/images/about-me1.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Lost Light Photography',
    description: 'Explore a curated collection of professional photography.',
    images: ['/images/about-me1.jpg'],
  },
};

export default function PortfolioPage() {
    return (
      <div className="container mx-auto px-4 py-12">
        <Suspense>
          <PortfolioGallery />
        </Suspense>
      </div>
    )
  }
  