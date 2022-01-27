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

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

const firebaseConfig = {
    apiKey: "AIzaSyCSLEnL3thTKn3CqlU5CB21H6eZ6LSnRIo",
    authDomain: "multi-flex-198ad.firebaseapp.com",
    projectId: "multi-flex-198ad",
    storageBucket: "multi-flex-198ad.appspot.com",
    messagingSenderId: "415470155918",
    appId: "1:415470155918:web:3625d3b096165d257db1df",
    measurementId: "G-360P2NDMWD"
};

export const fire = firebase.initializeApp(firebaseConfig);

const store  = configureStore();

function Root() {

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
