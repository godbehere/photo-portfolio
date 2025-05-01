export default function IntroSection() {
    return (
      <section className="bg-white text-center py-16 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Hello, I’m [Your Name]
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            I capture candid moments, emotions, and the beauty of everyday life. Whether it’s a wedding, portrait, or personal artwork — I tell stories through imagery.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/portfolio" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              See My Work
            </a>
            <a href="/booking" className="border border-black px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              Book a Session
            </a>
          </div>
        </div>
      </section>
    );
  }
  