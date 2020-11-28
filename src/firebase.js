// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBgmXX6ANUmgHSFEfSD9AYnPcGB1BNIBV8",
  authDomain: "fir-b9fc0.firebaseapp.com",
  databaseURL: "https://fir-b9fc0.firebaseio.com",
  projectId: "fir-b9fc0",
  storageBucket: "fir-b9fc0.appspot.com",
  messagingSenderId: "1092075293806",
  appId: "1:1092075293806:web:a283191b5987f0e8cbea7f",
  measurementId: "G-VD3LXSJBWC",
  
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db,auth};