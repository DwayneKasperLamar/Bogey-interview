import { initializeApp,  getApps, cert } from "firebase-admin/app"
import {getAuth} from "firebase-admin/auth"
import {getFirestore} from "firebase-admin/firestore"
import  bogey from "@/firebase/bogey.json"


// const privateKey = process.env.FIREBASE_PRIVATE_KEY
//   ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '')
//   : undefined;


const initFirebaseAdmin = () => {
    const apps = getApps()

    if(!apps.length) {
    try {
        initializeApp({
            credential: cert(bogey as any)
        });
        console.log("Firebase Admin initialized successfully");
    } catch (error) {
      console.error("Firebase Admin initialization error:", error);
      throw error;
    }
    }
    return {
        auth: getAuth(),
        db: getFirestore(),
    }
}

export const { auth, db } = initFirebaseAdmin()