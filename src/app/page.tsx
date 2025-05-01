// app/page.tsx
// import Layout from '@/app/layout'
import HeroSlideshow from "@/components/HeroSlideshow"
import { HeroOverlay } from "@/components/HeroOverlay"
import IntroSection from "@/components/IntroSection"
import PortfolioCategories from "@/components/PortfolioCategories"
import BookingPreview from "@/components/BookingPreview"
// import FeaturedProducts from "@/components/FeaturedProducts"
// import Testimonials from "@/components/Testimonials"
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

      {/* Featured Portfolio Categories */}
      <PortfolioCategories />

      {/* Booking Preview */}
      <BookingPreview />
      {/* Featured Shop Products */}
      {/* <FeaturedProducts /> */}

      {/* Testimonials (Optional) */}
      {/* <Testimonials /> */}

      <Footer />
    </>
  )
}
