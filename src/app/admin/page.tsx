// src/app/admin/page.tsx
import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:shadow transition">
          <h2 className="text-xl font-semibold">📅 Manage Sessions</h2>
          <p className="text-sm text-gray-600 mb-2">
            Create, edit, and remove session availability.
          </p>
          <div className="flex gap-4">
            <Link
              href="/admin/sessions"
              className="text-blue-600 underline hover:text-blue-800"
            >
              View Sessions
            </Link>
            <Link
              href="/admin/sessions/new"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Create New Session
            </Link>
          </div>
        </div>

        {/* Add more sections later like bookings, shop items, testimonials */}
      </div>
    </main>
  );
}
