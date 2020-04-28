import * as firebase from "firebase/app";
import "firebase/firestore";


var firebaseConfig = {
   apiKey: "AIzaSyDLZeUxI-qURbeXJ8tJjLq5Y98pEsjdI38",
   authDomain: "sea-temperature-app.firebaseapp.com",
   databaseURL: "https://sea-temperature-app.firebaseio.com",
   projectId: "sea-temperature-app",
   storageBucket: "sea-temperature-app.appspot.com",
   messagingSenderId: "755654553183",
   appId: "1:755654553183:web:2291d13f4b601c8c59f5ea"
 };
 
 firebase.initializeApp(firebaseConfig);

 export default firebase;