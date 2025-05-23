import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Shop Prints | Lost Light Photography',
  description: 'Purchase prints and digital downloads of fine art photography.',
  openGraph: {
    title: 'Shop Prints | Lost Light Photography',
    description: 'Purchase prints and digital downloads of fine art photography.',
    url: 'https://photography.lostlight.ca/shop',
    images: ['https://photography.lostlight.ca/images/grasshopper.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Prints | Lost Light Photography',
    description: 'Purchase prints and digital downloads of fine art photography.',
    images: ['https://photography.lostlight.ca/images/grasshopper.jpg'],
  },
};

export default function ShopPage() {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Shop</h1>
        <p>Prints and digital downloads powered by Stripe coming soon.</p>
      </div>
    )
  }
  