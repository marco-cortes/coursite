import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const sendNotification = async (notification, userId) => {
    
    const docRef = doc(db, "notifications", "" + userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
        if (docSnap.data()) {
            await setDoc(docRef, {
                notifications: [notification, ...docSnap.data().notifications]
            })
        } else {
            await setDoc(docRef, { notifications: [notification] });
        }
    }
}