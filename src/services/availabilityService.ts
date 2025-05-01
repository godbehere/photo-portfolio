import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { AvailabilityWindow } from "@/types/availability";

const availabilityRef = collection(db, "availability");

export async function getAllAvailability(): Promise<AvailabilityWindow[]> {
  const snapshot = await getDocs(availabilityRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as AvailabilityWindow));
}

export async function createAvailability(window: Omit<AvailabilityWindow, "id">) {
  return await addDoc(availabilityRef, window);
}

export async function updateAvailability(id: string, data: Partial<AvailabilityWindow>) {
  const docRef = doc(availabilityRef, id);
  await updateDoc(docRef, data);
}

export async function deleteAvailability(id: string) {
  const docRef = doc(availabilityRef, id);
  await deleteDoc(docRef);
}

export async function getAvailabilityById(id: string): Promise<AvailabilityWindow> {
  const ref = doc(db, "availability", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error("Session type not found");
  return { id: snapshot.id, ...snapshot.data() } as AvailabilityWindow;
}
