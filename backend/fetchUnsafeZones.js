import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

export async function fetchUnsafeZones() {
  const q = query(
    collection(db, "reports"),
    where("isVerified", "==", true)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
