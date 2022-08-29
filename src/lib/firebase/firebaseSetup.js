// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCq0mbdeUTCQXY3TO8YySzTQoysILTJBIc',
  authDomain: 'whistle-c6850.firebaseapp.com',
  projectId: 'whistle-c6850',
  storageBucket: 'whistle-c6850.appspot.com',
  messagingSenderId: '598540406228',
  appId: '1:598540406228:web:17c05d2920bee1dae15a41',
};

const initFirebase = () => {
  initializeApp(firebaseConfig);
};

// Initialize Firebase

export default initFirebase;
