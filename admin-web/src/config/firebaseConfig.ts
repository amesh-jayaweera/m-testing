import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAIPr6UJyzeSvojwPL6z7ugDCoX4ai8gL4",
    authDomain: "multiflex-backend.firebaseapp.com",
    projectId: "multiflex-backend",
    storageBucket: "multiflex-backend.appspot.com",
    messagingSenderId: "62729891915",
    appId: "1:62729891915:web:a160eee2c40ba014675dce",
    measurementId: "G-MMFNQ5JL8H"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
