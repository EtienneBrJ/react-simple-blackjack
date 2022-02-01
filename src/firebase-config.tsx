import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: process.env.API_KEY,
    authDomain: "simple-blackjack-leaderboard.firebaseapp.com",
    projectId: "simple-blackjack-leaderboard",
    storageBucket: "simple-blackjack-leaderboard.appspot.com",
    messagingSenderId: "1084997292950",
    appId: "1:1084997292950:web:b89814de33ef64c9c883b7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();