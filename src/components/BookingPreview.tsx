import Link from "next/link";

const sessionTypes = [
  {
    name: "Mini Portrait Session",
    price: "$150",
    duration: "30 minutes",
  },
  {
    name: "Full Session",
    price: "$300",
    duration: "1 hour",
  },
  {
    name: "Event Coverage",
    price: "Starting at $500",
    duration: "Custom pricing",
  },
];

export default function BookingPreview() {
  return (
    <section className="bg-white py-16 px-4 dark:bg-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Let’s Work Together</h2>
        <p className="text-gray-600 mb-10">
          I offer personalized sessions for portraits, events, and special moments.
          Choose the session that’s right for you and book your spot today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {sessionTypes.map((session) => (
            <div
              key={session.name}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold mb-2">{session.name}</h3>
              <p className="text-gray-700">{session.price}</p>
              <p className="text-sm text-gray-500">{session.duration}</p>
            </div>
          ))}
        </div>

        <Link
          href="/booking"
          className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Book a Session
        </Link>
      </div>
    </section>
  );
}
