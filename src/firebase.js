import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCK_zPoRgZUkOCEv38eo0MKWvDBn9wMYHE",
    authDomain: "task-manager-1afb0.firebaseapp.com",
    databaseURL: "https://task-manager-1afb0-default-rtdb.firebaseio.com",
    projectId: "task-manager-1afb0",
    storageBucket: "task-manager-1afb0.appspot.com",
    messagingSenderId: "17919590904",
    appId: "1:17919590904:web:3d536533f699195c40160d"
  };
// Initialize Firebase
const fbase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fbase;

