
import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyBgYDJUYQJLyWl4Uyf18PberSD1mDgMvd0",
  authDomain: "chat-app-98413.firebaseapp.com",
  projectId: "chat-app-98413",
  storageBucket: "chat-app-98413.appspot.com",
  messagingSenderId: "703065810476",
  appId: "1:703065810476:web:8a07bcfa4fd8fab0c65389",
  measurementId: "G-KEN3D2DXL0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if(window.location.hostname === 'localhost'){
  db.useEmulator('localhost','8880');
}

export { db, auth };

export default firebase;