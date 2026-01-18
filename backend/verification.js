import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// Confirm a report
export async function confirmReport(reportId) {
  const reportRef = doc(db, "reports", reportId);

  // Increase confirmation count
  await updateDoc(reportRef, {
    confirmCount: increment(1)
  });

  // Get updated report
  const snapshot = await getDoc(reportRef);
  const data = snapshot.data();

  // Verify after 3 confirmations
  if (data.confirmCount >= 3 && !data.isVerified) {
    await updateDoc(reportRef, {
      isVerified: true
    });
  }
}

// Dispute a report
export async function disputeReport(reportId) {
  const reportRef = doc(db, "reports", reportId);

  await updateDoc(reportRef, {
    disputeCount: increment(1)
  });
}
