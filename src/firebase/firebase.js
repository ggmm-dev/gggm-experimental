import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDa1G9O6NTrUDmdlnh6JJX34QdSjQQh3u8",
  authDomain: "ggmm-kilowatt.firebaseapp.com",
  databaseURL: "https://ggmm-kilowatt.firebaseio.com",
  projectId: "ggmm-kilowatt",
  storageBucket: "ggmm-kilowatt.appspot.com",
  messagingSenderId: "709816617607"
};

export const fire = firebase.initializeApp(config);

export default fire;
