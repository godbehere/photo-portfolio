// app/page.tsx
// import Layout from '@/app/layout'
import HeroSlideshow from "@/components/HeroSlideshow"
import { HeroOverlay } from "@/components/HeroOverlay"
import IntroSection from "@/components/IntroSection"
import PortfolioCategories from "@/components/PortfolioCategories"
import BookingPreview from "@/components/BookingPreview"
import FeaturedProducts from "@/components/FeaturedProducts"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <HeroSlideshow />
        </div>

        {/* Overlay */}
        <HeroOverlay />

        {/* Heading Content */}
        <div className="relative z-20 flex items-center justify-center h-full text-center px-4 pointer-events-none">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Capturing Life’s Beautiful Moments
          </h1>
        </div>
      </section>

      {/* Intro + CTAs */}
      <IntroSection />
      {/* <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Hi, I&apos;m [Your Name]</h2>
        <p className="mb-6 text-gray-600">Portrait & event photographer — available for bookings & digital art sales.</p>
        <div className="space-x-4">
          <a href="/portfolio" className="inline-block px-6 py-3 bg-black text-white rounded-full">See My Work</a>
          <a href="/booking" className="inline-block px-6 py-3 border border-black rounded-full">Book a Session</a>
        </div>
      </section> */}

      {/* Featured Portfolio Categories */}
      <PortfolioCategories />
      {/* <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold text-center mb-8">Featured Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded overflow-hidden p-4 text-center">Weddings</div>
            <div className="bg-white shadow rounded overflow-hidden p-4 text-center">Portraits</div>
            <div className="bg-white shadow rounded overflow-hidden p-4 text-center">Events</div>
          </div>
        </div>
      </section> */}

      {/* Booking Preview */}
      <BookingPreview />
      {/* Featured Shop Products */}
      <FeaturedProducts />
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold text-center mb-8">Popular Prints & Downloads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white shadow rounded p-4">📸 Print #1</div>
            <div className="bg-white shadow rounded p-4">🖼️ Digital Art #1</div>
            <div className="bg-white shadow rounded p-4">🌅 Landscape Series</div>
          </div>
        </div>
      </section> */}

      {/* Testimonials (Optional) */}
      <Testimonials />
      {/* <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-8">Client Testimonials</h3>
          <blockquote className="italic text-gray-600 max-w-xl mx-auto">&quot;Absolutely stunning work. Made our wedding unforgettable!&quot;</blockquote>
        </div>
      </section> */}
      <Footer />
    </>
  )
}
