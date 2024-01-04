// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8TmqerEtrVgPNproerB-S1PfmYc08YJU",
  authDomain: "andorlegends.firebaseapp.com",
  projectId: "andorlegends",
  storageBucket: "andorlegends.appspot.com",
  messagingSenderId: "79096540602",
  appId: "1:79096540602:web:272a67d4c0aebb50a24183",
  measurementId: "G-YG6NY08XCW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);