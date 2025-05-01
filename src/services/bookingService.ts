import { db } from "@/lib/firebase";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore";
import { getAvailabilityById } from "./availabilityService";
import { logFirestoreError } from "@/utils/logger";

export type Booking = {
  id?: string;
  availabilityWindowId: string;
  createdAt: Timestamp;
  startTime: Timestamp;
  endTime: Timestamp;
  date?: string;
  duration: number;
  name: string;
  email: string;
  notes?: string;
};

const bookingsRef = collection(db, "bookings");

export async function createBooking(data: {
  sessionTypeId: string;
  availabilityWindowId: string;
  startTime: string;
  duration: number;
  name: string;
  email: string;
  notes?: string;
}) {
//   const bookingStart = Timestamp.now(); // Use actual selected start time
  const availability = await getAvailabilityById(data.availabilityWindowId);
  const start = availability.startTime.toDate();
  const end = availability.endTime.toDate();
  const bookingStartDate = new Date(data.startTime);
  const bookingEndDate = new Date(bookingStartDate.getTime() + data.duration * 60000);

  // Save the booking
  await addDoc(collection(db, "bookings"), {
    ...data,
    startTime: Timestamp.fromDate(bookingStartDate),
    endTime: Timestamp.fromDate(bookingEndDate),
    createdAt: Timestamp.now(),
  });

  const availabilityRef = doc(db, "availability", data.availabilityWindowId);

  // Trim or split availability
  if (
    bookingStartDate.getTime() === start.getTime() &&
    bookingEndDate.getTime() === end.getTime()
  ) {
    // Full overlap: delete
    await deleteDoc(availabilityRef);
  } else if (bookingStartDate.getTime() === start.getTime()) {
    // Trim start
    await updateDoc(availabilityRef, {
      startTime: Timestamp.fromDate(bookingEndDate),
    });
  } else if (bookingEndDate.getTime() === end.getTime()) {
    // Trim end
    await updateDoc(availabilityRef, {
      endTime: Timestamp.fromDate(bookingStartDate),
    });
  } else {
    // Split into two
    await Promise.all([
      updateDoc(availabilityRef, {
        endTime: Timestamp.fromDate(bookingStartDate),
      }),
      addDoc(collection(db, "availability"), {
        date: availability.date,
        startTime: Timestamp.fromDate(bookingEndDate),
        endTime: availability.endTime,
      }),
    ]);
  }
}

export async function getAllBookings(): Promise<Booking[]> {
  try {
    const snapshot = await getDocs(bookingsRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Booking, "id">),
    }));
  } catch (error) {
    logFirestoreError("Fetching all bookings", error);
    return [];
  }
}