// app/page.tsx
// import Layout from '@/app/layout'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center bg-[url('/hero.jpg')] flex items-center justify-center text-white text-5xl font-bold">
        Capturing Life’s Beautiful Moments
      </section>

      {/* Intro + CTAs */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Hi, I&apos;m [Your Name]</h2>
        <p className="mb-6 text-gray-600">Portrait & event photographer — available for bookings & digital art sales.</p>
        <div className="space-x-4">
          <a href="/portfolio" className="inline-block px-6 py-3 bg-black text-white rounded-full">See My Work</a>
          <a href="/booking" className="inline-block px-6 py-3 border border-black rounded-full">Book a Session</a>
        </div>
      </section>

      {/* Featured Portfolio Categories */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold text-center mb-8">Featured Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded overflow-hidden p-4 text-center">Weddings</div>
            <div className="bg-white shadow rounded overflow-hidden p-4 text-center">Portraits</div>
            <div className="bg-white shadow rounded overflow-hidden p-4 text-center">Events</div>
          </div>
        </div>
      </section>

      {/* Featured Shop Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-semibold text-center mb-8">Popular Prints & Downloads</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white shadow rounded p-4">📸 Print #1</div>
            <div className="bg-white shadow rounded p-4">🖼️ Digital Art #1</div>
            <div className="bg-white shadow rounded p-4">🌅 Landscape Series</div>
          </div>
        </div>
      </section>

      {/* Testimonials (Optional) */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-8">Client Testimonials</h3>
          <blockquote className="italic text-gray-600 max-w-xl mx-auto">&quot;Absolutely stunning work. Made our wedding unforgettable!&quot;</blockquote>
        </div>
      </section>
    </>
  )
}
