import { db } from "@/lib/firebase";
import { SessionType } from "@/shared/types";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const sessionTypesRef = collection(db, "sessionTypes");

export async function getAllSessionTypes(): Promise<SessionType[]> {
  const snapshot = await getDocs(sessionTypesRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as SessionType));
}

export async function createSessionType(sessionType: Omit<SessionType, "id">): Promise<void> {
  await addDoc(sessionTypesRef, sessionType);
}

export async function updateSessionType(id: string, sessionType: Partial<SessionType>): Promise<void> {
  const docRef = doc(db, "sessionTypes", id);
  await updateDoc(docRef, sessionType);
}

export async function deleteSessionType(id: string): Promise<void> {
  const docRef = doc(db, "sessionTypes", id);
  await deleteDoc(docRef);
}

export async function getSessionTypeById(id: string): Promise<SessionType> {
  const ref = doc(db, "sessionTypes", id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) throw new Error("Session type not found");
  return { id: snapshot.id, ...snapshot.data() } as SessionType;
}
