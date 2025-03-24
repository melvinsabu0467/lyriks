import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOPzmWV_r4L0fhWIvLTp2CSqBpFDuf3os",
  authDomain: "lyriks-d2869.firebaseapp.com",
  projectId: "lyriks-d2869",
  storageBucket: "lyriks-d2869.firebasestorage.app", // Confirm if this is correct or use "lyriks-d2869.appspot.com"
  messagingSenderId: "966998199959",
  appId: "1:966998199959:web:ae44b6992f6f89fe31e3d2",
  measurementId: "G-9J1X5FDW2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
