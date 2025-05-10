import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { logFirestoreError } from "@/utils/logger";
import { getFunctions, httpsCallable } from "firebase/functions"
import { Booking } from "@/shared/types";

const bookingsRef = collection(db, "bookings");

const functions = getFunctions();
const createBookingCloud = httpsCallable(functions, 'createBooking');
const sendEmail = httpsCallable(functions, 'sendConfirmationEmail');

export async function createBooking(data: {
  sessionTypeId: string;
  availabilityWindowId: string;
  startTime: string;
  duration: number;
  name: string;
  email: string;
  notes?: string;
}) {
  try {
    await createBookingCloud(data);
  } catch (error) {
    logFirestoreError("Creating booking", error);
  } finally {
    console.log("Sending email");
    await sendEmail(data);
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