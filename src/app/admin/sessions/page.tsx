"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Session, getAllSessions, deleteSession } from "@/services/firestore";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSessions() {
      const data = await getAllSessions();
      setSessions(data);
      setLoading(false);
    }
    fetchSessions();
  }, []);

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this session?")) {
      await deleteSession(id);
      toast.success("Session deleted");
      setSessions(prev => prev.filter(session => session.id !== id));
    }
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">All Sessions</h1>
        <Link
          href="/admin/sessions/new"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
        >
          + New Session
        </Link>
      </div>
      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        <div className="grid gap-4">
          {sessions.map(session => (
            <div
              key={session.id}
              className="border rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h2 className="font-semibold text-lg">{session.title}</h2>
                <p className="text-sm text-gray-600">
                  {format(session.date.toDate(), "PPP")} at {session.time}
                </p>
                <p className="text-sm">Type: {session.sessionType}</p>
                <p className="text-sm">Price: ${session.price}</p>
                {session.isBooked && (
                  <p className="text-sm text-red-600">Already booked</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/sessions/edit/${session.id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(session.id!)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
