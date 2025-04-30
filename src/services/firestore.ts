import { db } from "@/lib/firebase";
import { collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    // setDoc,
    updateDoc,
    query,
    where,
    Timestamp } from "firebase/firestore";
import { logFirestoreError } from "@/utils/logger"; // Import the logger utility

// --- TYPES ---

export type Session = {
  id?: string; // Firestore document ID
  title: string;
  description?: string;
  date: Timestamp;
  time: string;
  sessionType: string;
  price: number;
  isBooked?: boolean;
};

export type Booking = {
  id?: string;
  sessionId: string;
  name: string;
  email: string;
  notes?: string;
  createdAt: Timestamp;
};

// --- COLLECTION REFERENCES ---

const sessionsRef = collection(db, "sessions");
const bookingsRef = collection(db, "bookings");

// --- SESSION SERVICES ---

export async function getAllSessions(): Promise<Session[]> {
  try {
    const snapshot = await getDocs(sessionsRef);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Session, "id">),
    }));
  } catch (error) {
    logFirestoreError("Fetching all sessions", error);
    return [];
  }
}

export async function getAvailableSessions(): Promise<Session[]> {
  try {
    const q = query(sessionsRef, where("isBooked", "==", false));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Session, "id">),
    }));
  } catch (error) {
    logFirestoreError("Fetching available sessions", error);
    return [];
  }
}

export async function createSession(session: Omit<Session, "id">): Promise<void> {
  try {
    await addDoc(sessionsRef, session);
  } catch (error) {
    logFirestoreError("Creating new session", error);
  }
}

export async function bookSession(booking: Omit<Booking, "id" | "createdAt">): Promise<boolean> {
  try {
    const sessionDocRef = doc(db, "sessions", booking.sessionId);
    const sessionSnap = await getDoc(sessionDocRef);

    if (!sessionSnap.exists()) {
      logFirestoreError("Booking session", "Session does not exist.");
      return false;
    }

    const sessionData = sessionSnap.data() as Session;

    if (sessionData.isBooked) {
      logFirestoreError("Booking session", "Session already booked.");
      return false;
    }

    await addDoc(bookingsRef, {
      ...booking,
      createdAt: Timestamp.now(),
    });

    await updateDoc(sessionDocRef, { isBooked: true });

    return true;
  } catch (error) {
    logFirestoreError("Booking session", error);
    return false;
  }
}

// --- BOOKING SERVICES (Admin View Later) ---

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
