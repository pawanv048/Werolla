import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCjJhTqTlueMDoXM6hdiPf0eulqmOob4K0",
    authDomain: "kujuo-e0db6.firebaseapp.com",
    projectId: "kujuo-e0db6",
    storageBucket: "kujuo-e0db6.appspot.com",
    messagingSenderId: "932160520404",
    appId: "1:932160520404:web:9e46ce86742db26439fb41",
    measurementId: "G-NBM5LN1F4M"
}

if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig)
};

export default () => {
    return { firebase, auth };
}