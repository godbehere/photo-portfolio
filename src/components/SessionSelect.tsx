"use client";

import { useState, useEffect } from "react";
import { getAvailableSessions, Session } from "@/services/firestore";
import BookingForm from "./BookingForm";

export default function SessionSelect() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      try {
        const data = await getAvailableSessions();
        setSessions(data);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      }
    }
    fetchSessions();
  }, []);

  if (selectedSession) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedSession(null)}
          className="text-blue-600 underline"
        >
          ← Choose a different session
        </button>
        <h2 className="text-xl font-semibold mb-4">Booking: {selectedSession.title}</h2>
        <BookingForm selectedSession={selectedSession} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="border rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
          onClick={() => setSelectedSession(session)}
        >
          <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
          <p className="text-gray-600">{session.sessionType}</p>
          <p className="text-gray-800 font-bold mt-2">${session.price}</p>
          <p className="text-sm text-gray-500 mt-1">{new Date(session.date.seconds * 1000).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
