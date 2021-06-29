import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {configureStore} from "./store/store";
import firebase from "firebase";

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

    const firebaseConfig = {
        apiKey: "AIzaSyCEIhkwskJv2cdl1Yffm9UZdmGQVNk1Syg",
        authDomain: "multi-flex-cleaning-backend.firebaseapp.com",
        projectId: "multi-flex-cleaning-backend",
        storageBucket: "multi-flex-cleaning-backend.appspot.com",
        messagingSenderId: "50317097132",
        appId: "1:50317097132:web:4b59d5048161ec9a40c709",
        measurementId: "G-WH6NWTVSQX"
    };

    firebase.initializeApp(firebaseConfig);

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
