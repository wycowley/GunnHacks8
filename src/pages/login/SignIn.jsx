import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { getFirestore, setDoc, getDoc, collection, doc } from "firebase/firestore";
import { useState } from "react";
import "./SignIn.css";
import GoogleButton from "react-google-button";

const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore();
const SignIn = (props) => {
    const [redirect, changeRedirect] = useState(false);
    let navigate = useNavigate();
    function doSignIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                doAsynchStuff(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    const doAsynchStuff = async (user) => {
        const userRef = doc(db, "users", user.uid);
        const document = await getDoc(userRef);
        if (document.exists()) {
        } else {
            await setDoc(userRef, { displayName: user.displayName, groups: [], email: user.email, profileImg: user.photoURL, dailyPoints: {}, totalPoints: 0, totalGood: 0 });
            navigate("/");
        }
    };
    return (
        <div className='other-container'>
            <GoogleButton onClick={doSignIn} className='google-button'>
                Sign in with Google
            </GoogleButton>
        </div>
    );
};
export default SignIn;
