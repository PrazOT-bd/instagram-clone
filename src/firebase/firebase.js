// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDnO42lilQqNZvW0ByDf-7AlLjvDMDzjqw",
    authDomain: "insta-clone-bc83b.firebaseapp.com",
    projectId: "insta-clone-bc83b",
    storageBucket: "insta-clone-bc83b.appspot.com",
    messagingSenderId: "708824406992",
    appId: "1:708824406992:web:b70a395265dc272aa8f7d5",
    measurementId: "G-L4B2KBRPPW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
