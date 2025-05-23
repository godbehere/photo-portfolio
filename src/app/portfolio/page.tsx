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
        url: 'https://firebasestorage.googleapis.com/v0/b/photo-portfolio-35e2d.firebasestorage.app/o/portfolio%2FLandscapes%2F47bfc114-febd-4791-903f-81d7975516de?alt=media&token=6b50df6d-8b3c-4461-a988-074a54b39c86',
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
    images: ['https://firebasestorage.googleapis.com/v0/b/photo-portfolio-35e2d.firebasestorage.app/o/portfolio%2FLandscapes%2F47bfc114-febd-4791-903f-81d7975516de?alt=media&token=6b50df6d-8b3c-4461-a988-074a54b39c86'],
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
  