// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA18rX8VtVcjtuN69KntdEmpwycMpz4Wa8",
  authDomain: "fiscall-9593f.firebaseapp.com",
  projectId: "fiscall-9593f",
  storageBucket: "fiscall-9593f.appspot.com",
  messagingSenderId: "854964157436",
  appId: "1:854964157436:web:7b4ce5a515e8b67fdf9079",
  measurementId: "G-NWJV8J696Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export{app}
export{analytics}