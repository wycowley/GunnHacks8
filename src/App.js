import "./App.css";
import app from "./firebase.js";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignIn from "./pages/login/SignIn";
import Groups from "./pages/group/Groups";
import Profile from "./pages/profile/Profile";

import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import NavBar from "./components/NavBar";

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
                <Route path='/profile' element={<Profile />} />
                {/* <Route path='/group/:id' element={<Group />} /> */}
            </Routes>
            <div style={{ height: "4rem" }}></div>
            {user && <NavBar></NavBar>}
        </div>
    );
}

export default App;
