import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0f7pSonnjVhIAbx5LbBCarFXQ51vxXOg",
  authDomain: "dhit-platform.firebaseapp.com",
  projectId: "dhit-platform",
  storageBucket: "dhit-platform.firebasestorage.app",
  messagingSenderId: "446126800106",
  appId: "1:446126800106:web:d1732f3d9b1657ed29eb93",
  measurementId: "G-QM266JV4X6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
