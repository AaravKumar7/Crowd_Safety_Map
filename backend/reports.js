import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.js";

export async function addUnsafeLocation(latitude, longitude, description, category) {
  await addDoc(collection(db, "reports"), {
    latitude: latitude,
    longitude: longitude,
    description: description,
    category: category,
    createdAt: serverTimestamp(),
    confirmCount: 0,
    disputeCount: 0,
    isVerified: false
  });
}
