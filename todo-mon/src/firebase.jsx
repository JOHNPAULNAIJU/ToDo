import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "todo-mon.firebaseapp.com",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db ;
