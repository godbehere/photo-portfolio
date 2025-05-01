import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export type PortfolioImageDoc = {
  url: string;
  storagePath: string;
  title?: string;
  description?: string;
  visible?: boolean;
  category: string;
  tags: string[];
};

export async function createPortfolioImageDoc(data: PortfolioImageDoc) {
    const docRef = await addDoc(collection(db, "portfolioImages"), {
      ...data,
      visible: data.visible ?? true,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  }
