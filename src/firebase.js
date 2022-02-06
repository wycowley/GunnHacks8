import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCE2yjYNqE0Rcpy97huxry7f8XOL-_okI0",
    authDomain: "good-competition.firebaseapp.com",
    projectId: "good-competition",
    storageBucket: "good-competition.appspot.com",
    messagingSenderId: "148323929283",
    appId: "1:148323929283:web:2c6fd2a5e26f1ba6826676",
    measurementId: "G-DB14M019YY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
