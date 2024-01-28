// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*
  apiKey: "AIzaSyD8TmqerEtrVgPNproerB-S1PfmYc08YJU",
  authDomain: "andorlegends.web.app",
  projectId: "andorfanlegends-e1bcf",
  storageBucket: "andorfanlegends-e1bcf.appspot.com",
  messagingSenderId: "79096540602",
  appId: "1:79096540602:web:272a67d4c0aebb50a24183",
  measurementId: "G-YG6NY08XCW"
  */
  apiKey: "AIzaSyCqD4G8n6du602PMz_zeozHahtV-wmKuJc",
  authDomain: "andorfanlegends.web.app",
  projectId: "andorfanlegends",
  storageBucket: "andorfanlegends.appspot.com",
  messagingSenderId: "871901879049",
  appId: "1:871901879049:web:fcda711f3bfbb21b9b51d8",
  measurementId: "G-TKNTKYE83J"
  //measurementId: "G-YG6NY08XCW"
};


window.dataLayer = window.dataLayer || [];
window.gtag = function(){window.dataLayer.push(arguments);}

window.gtag("config", firebaseConfig.measurementId, {
	cookie_domain: window.location.hostname,
	cookie_flags: "SameSite=None;Secure",
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);