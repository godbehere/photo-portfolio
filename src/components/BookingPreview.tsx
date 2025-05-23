import { getAllSessionTypes } from "@/services/sessionTypes";
import Link from "next/link";

const sessionTypes = (await getAllSessionTypes()).slice(0, 3);

export default function BookingPreview() {
  return (
    <section className="bg-white py-16 px-4 dark:bg-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Let’s Work Together</h2>
        <p className="text-gray-600 mb-10 dark:text-white">
          I offer personalized sessions for portraits, events, and special moments.
          Choose the session that’s right for you and book your spot today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {sessionTypes.map((session) => (
            
            <div
              key={session.name}
              className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <Link href={`/booking?sessionType=${session.id}`}>
                <h3 className="text-lg font-semibold">{session.name}</h3>
                <p className="text-sm text-gray-600 dark:text-white">{session.durations.length === 1 ? `Price: $${(session.hourlyRate * session.durations[0] / 60).toFixed(2)}` : `Starting @ $${(session.hourlyRate * session.durations[0] / 60).toFixed(2)}`}</p>
                {session.durations.length === 1 ? <p className="text-sm text-gray-600 dark:text-white">Length: {session.durations[0] / 60} hours</p> : null}
              </Link>
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
