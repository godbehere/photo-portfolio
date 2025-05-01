import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";

export async function uploadImage(file: File, category: string) {
  const storage = getStorage();
  const id = uuid();
  const storagePath = `portfolio/${category}/${id}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return { url, storagePath };
}
