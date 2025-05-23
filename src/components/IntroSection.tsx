export default function IntroSection() {
    return (
      <section className="bg-white text-center py-16 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Welcome to Lost Light Photography
          </h2>
          <p className="text-lg text-gray-600 mb-6 dark:text-white">
            Lost Light Photography is all about capturing honest, beautiful moments — whether it’s a family session, event, or something in between.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/portfolio" className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              See My Work
            </a>
            <a href="/booking" className="border border-black px-6 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition">
              Book a Session
            </a>
          </div>
        </div>
      </section>
    );
  }
  