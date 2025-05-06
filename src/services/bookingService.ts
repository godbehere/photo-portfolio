import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { logFirestoreError } from "@/utils/logger";
import { getFunctions, httpsCallable } from "firebase/functions"
import { Booking } from "@/types";

const bookingsRef = collection(db, "bookings");

const functions = getFunctions();
const createBookingCloud = httpsCallable(functions, 'createBooking');

export async function createBooking(data: {
  sessionTypeId: string;
  availabilityWindowId: string;
  startTime: string;
  duration: number;
  name: string;
  email: string;
  notes?: string;
}) {
  console.log("About to create booking");
  await createBookingCloud(data);
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