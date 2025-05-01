import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export type PortfolioImage = {
  id: string;
  url: string;
  storagePath: string;
  title?: string;
  description?: string;
  visible: boolean;
  category: string;
  tags: string[];
  createdAt: Timestamp;
};

export type PortfolioImageDoc = Omit<PortfolioImage, "id" | "createdAt" | "visible"> & {
  visible?: boolean;
};

// Upload image to Firebase Storage and return URL + path
export async function uploadImage(file: File, category: string) {
  const storage = getStorage();
  const id = uuid();
  const storagePath = `portfolio/${category}/${id}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return { url, storagePath };
}

// Create Firestore document in 'portfolioImages'
export async function createPortfolioImageDoc(data: PortfolioImageDoc): Promise<string> {
  const docRef = await addDoc(collection(db, "portfolioImages"), {
    ...data,
    visible: data.visible ?? true,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Fetch images optionally filtered by category and tags
export async function getPortfolioImages(
  category?: string,
  tags: string[] = []
): Promise<PortfolioImage[]> {
  let q = query(collection(db, "portfolioImages"), orderBy("createdAt", "desc"));

  if (category) {
    q = query(q, where("category", "==", category));
  }

  if (tags.length > 0) {
    q = query(q, where("tags", "array-contains-any", tags));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as PortfolioImage[];
}
