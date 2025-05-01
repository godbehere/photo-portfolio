import Link from "next/link";
import { getAllAvailability } from "@/services/availabilityService";
import { getAllSessionTypes } from "@/services/sessionTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBookings } from "@/services/bookingService";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export default async function AdminDashboardPage() {
  const sessionCookie = (await cookies()).get('__session')?.value;
  if (!sessionCookie) return redirect('/login');

  const [availability, sessionTypes, bookings] = await Promise.all([
    getAllAvailability(),
    getAllSessionTypes(),
    getAllBookings(),
  ]);

  try {
    const decoded = await getAuth().verifySessionCookie(sessionCookie, true);
    if (!decoded.admin) return redirect('/unauthorized');

    return (
      <main className="max-w-5xl mx-auto p-6 space-y-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/availability">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Manage Availability</h2>
                <p className="text-muted-foreground text-sm">Set available dates and time windows.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/session-types">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Manage Session Types</h2>
                <p className="text-muted-foreground text-sm">Edit session lengths and pricing.</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/portfolio-upload">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Upload Images</h2>
                <p className="text-muted-foreground text-sm">Add images to portfolio.</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Booking Quick View */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Current Bookings</h2>
            {/* <Link href="/admin/availability/">
              <Button size="sm">Add Availability</Button>
            </Link> */}
          </div>
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings currently.</p>
          ) : (
            <ul className="space-y-2">
              {bookings.map((booking) => (
                <li key={booking.id} className="flex items-center justify-between border rounded p-3 text-sm">
                  <span>{booking.name} — {booking.startTime.toDate().toLocaleDateString([], { hour: "2-digit", minute: "2-digit" })} Duration: {booking.duration}</span>
                  <div className="space-x-2">
                    {/* <Link href={`/admin/availability/edit/${booking.id}`}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link> */}
                    {/* Optional: Delete button */}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Availability Quick View */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Current Availability</h2>
            <Link href="/admin/availability/">
              <Button size="sm">Add Availability</Button>
            </Link>
          </div>
          {availability.length === 0 ? (
            <p className="text-muted-foreground text-sm">No availability windows set.</p>
          ) : (
            <ul className="space-y-2">
              {availability.map((slot) => (
                <li key={slot.id} className="flex items-center justify-between border rounded p-3 text-sm">
                  <span>{slot.date} — {slot.startTime.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} to {slot.endTime.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  <div className="space-x-2">
                    <Link href={`/admin/availability/edit/${slot.id}`}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link>
                    {/* Optional: Delete button */}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Session Types Quick View */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Session Types</h2>
            <Link href="/admin/session-types/">
              <Button size="sm">Add Session Type</Button>
            </Link>
          </div>
          {sessionTypes.length === 0 ? (
            <p className="text-muted-foreground text-sm">No session types added.</p>
          ) : (
            <ul className="space-y-2">
              {sessionTypes.map((type) => (
                <li key={type.id} className="flex items-center justify-between border rounded p-3 text-sm">
                  <span>
                    <strong>{type.name}</strong> — {type.durations.join(", ")} mins @ ${type.hourlyRate}/hr
                  </span>
                  <div className="space-x-2">
                    <Link href={`/admin/session-types/edit/${type.id}`}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    );
  } catch {
    return redirect('/login');
  }
}
