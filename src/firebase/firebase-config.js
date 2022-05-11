import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBwPbSp-AOeGLdnUNTzKCprxnxVIre2BQA",
  authDomain: "coursite-api.firebaseapp.com",
  projectId: "coursite-api",
  storageBucket: "coursite-api.appspot.com",
  messagingSenderId: "799351780798",
  appId: "1:799351780798:web:253efbf119795a391bf5ef"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

