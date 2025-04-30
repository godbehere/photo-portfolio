import { getAllSessions } from "@/services/firestore";
import Link from "next/link";

export default async function AdminSessionsPage() {
  const sessions = await getAllSessions();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Sessions</h1>
        <Link
          href="/admin/sessions/new"
          className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/80 transition"
        >
          + New Session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center text-gray-500">
          No sessions yet. Click &quot;New Session&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="p-4 border rounded-md shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
              <p className="text-gray-600 mb-1">
                {session.date.toDate().toLocaleDateString()} @ {session.time}
              </p>
              <p className="text-gray-500 text-sm mb-2">{session.sessionType}</p>
              <p className="text-green-600 font-bold">${session.price}</p>
              {session.isBooked && (
                <p className="text-red-500 font-semibold mt-2">Already Booked</p>
              )}
              {/* In future, add Edit/Delete buttons here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
