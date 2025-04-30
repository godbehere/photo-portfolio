// src/services/bookingService.ts
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, updateDoc, Timestamp } from "firebase/firestore";

const bookingsRef = collection(db, "bookings");
const availabilityRef = collection(db, "availability");

export async function createBooking(data: {
  sessionTypeId: string;
  availabilityWindowId: string;
  duration: number;
  name: string;
  email: string;
  notes?: string;
}) {
  const now = Timestamp.now();

  // Create booking
  await addDoc(bookingsRef, {
    sessionTypeId: data.sessionTypeId,
    availabilityWindowId: data.availabilityWindowId,
    duration: data.duration,
    name: data.name,
    email: data.email,
    notes: data.notes || "",
    createdAt: now,
  });

  // Optionally update availability window — mark it as booked (or adjust available time)
  const availabilityDoc = doc(availabilityRef, data.availabilityWindowId);
  await updateDoc(availabilityDoc, {
    isBooked: true, // Optional: Or custom logic later for partial booking support
  });
}
