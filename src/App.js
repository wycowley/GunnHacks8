import "./App.css";
import app from "./firebase.js";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/login/SignIn";
import Groups from "./pages/group/Groups";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";

const auth = getAuth();
function App() {
    const [user, loading] = useAuthState(auth);
    let navigate = useNavigate();
    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate("/signin");
            }
            // signOut(getAuth());
        }
    }, [loading, user]);
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/groups' element={<Groups />} />
                {/* <Route path='/group/:id' element={<Group />} /> */}
            </Routes>
        </div>
    );
}

export default App;
