import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDY2j1LiccrwIYnQjcMZU_gctrf0EP2qxE",
    authDomain: "todo-mon.firebaseapp.com",
    projectId: "todo-mon",
    storageBucket: "todo-mon.appspot.com",
    messagingSenderId: "159483898221",
    appId: "1:159483898221:web:b7acd7a8b332caccd2d264",
    measurementId: "G-HX8R5XHF5Q"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db ;