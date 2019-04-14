import firebase from 'firebase';
require("firebase/firestore");

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCs2WblkNJrdzG4vuMPrmoWK-czKTrQgXA",
    authDomain: "vue-shop-34bc2.firebaseapp.com",
    databaseURL: "https://vue-shop-34bc2.firebaseio.com",
    projectId: "vue-shop-34bc2",
    storageBucket: "vue-shop-34bc2.appspot.com",
    messagingSenderId: "613608128719"
  };
  
const fb = firebase.initializeApp(config);

const db = firebase.firestore();

export{fb,db}