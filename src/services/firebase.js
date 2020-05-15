
// RECOMENDED IMPORT METHOD LOADS IN FOLDER
// what is the best way to import firebase???
import * as firebase from "firebase/app";

// import firebase from 'firebase'
import "firebase/analytics";
import "firebase/auth"; // do i need this
import "firebase/database"
 const productionConfig = {
    apiKey: "AIzaSyBZt5udwhi0_yA8QTIY26ce495Ys5GCVOA",
    authDomain: "neighbor-app-mmg.firebaseapp.com",
    databaseURL: "https://neighbor-app-mmg.firebaseio.com",
    projectId: "neighbor-app-mmg",
    storageBucket: "neighbor-app-mmg.appspot.com",
    messagingSenderId: "1068078984410",
    appId: "1:1068078984410:web:212eef6c4ca25e762389e3",
    measurementId: "G-TZKLPWHX4L"
  };

  const devConfig = {
    apiKey: "AIzaSyAYgZzslesYLZV3qYpQu17fQI2kZvi4xpk",
    authDomain: "neighbor-dev.firebaseapp.com",
    databaseURL: "https://neighbor-dev.firebaseio.com",
    projectId: "neighbor-dev",
    storageBucket: "neighbor-dev.appspot.com",
    messagingSenderId: "1047347961463",
    appId: "1:1047347961463:web:19897536112767b7f6b072",
    measurementId: "G-KFSZ3V5L1F"
  };

  const firebaseConfig =  process.env.NODE_ENV === 'production' ? productionConfig : devConfig;

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  // or use Firestore
  export const auth = firebase.auth()
  export const database = firebase.database()