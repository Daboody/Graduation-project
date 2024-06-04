import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAbq7dNHZjOgN6cfMGrzePVoaam5caubMk",

  authDomain: "graduation-project-575af.firebaseapp.com",

  projectId: "graduation-project-575af",

  storageBucket: "graduation-project-575af.appspot.com",

  messagingSenderId: "1012581877810",

  appId: "1:1012581877810:web:28ba5702b59171dff2942b"

};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
