import firebase from "firebase";
import {firebaseConfig} from "../settings";

firebase.initializeApp(firebaseConfig);

const locationRef = firebase.database().ref("location");

export {locationRef};