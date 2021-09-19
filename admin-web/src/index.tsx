import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from "./store/store";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// console.log = console.warn = console.error = () => {};

const firebaseConfig = {
    apiKey: "AIzaSyAuSo0vOg4a9ELjR7Gl02NWnWxKQEXRPnw",
    authDomain: "multiflex-backend-853fb.firebaseapp.com",
    projectId: "multiflex-backend-853fb",
    storageBucket: "multiflex-backend-853fb.appspot.com",
    messagingSenderId: "764555404331",
    appId: "1:764555404331:web:61e371507740bfaf9fb66e",
    measurementId: "G-4G15JLV32B"
};

export const fire = firebase.initializeApp(firebaseConfig);

const store  = configureStore();

function Root() {

    // const firebaseConfig = {
    //     apiKey: "AIzaSyAIPr6UJyzeSvojwPL6z7ugDCoX4ai8gL4",
    //     authDomain: "multiflex-backend.firebaseapp.com",
    //     projectId: "multiflex-backend",
    //     storageBucket: "multiflex-backend.appspot.com",
    //     messagingSenderId: "62729891915",
    //     appId: "1:62729891915:web:a160eee2c40ba014675dce",
    //     measurementId: "G-MMFNQ5JL8H"
    // };

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);
