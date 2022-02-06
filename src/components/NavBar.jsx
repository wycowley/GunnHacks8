import { Link, useLocation } from "react-router-dom";
import "./components.css";
import { useEffect, useState } from "react";

import Groups from "../icons/Groups.png";
import Home from "../icons/Home.png";
import Profile from "../icons/Profile.png";

const NavBar = () => {
    let location = useLocation();
    const [active, setActive] = useState(location.pathname);

    useEffect(() => {
        if (location.pathname === "/") {
            setActive("home");
        } else if (location.pathname === "/groups") {
            setActive("groups");
        } else if (location.pathname === "/profile") {
            setActive("profile");
        }
    }, [location]);
    return (
        <div className='navbar padIn'>
            <div className='neuOut'>
                <div className={active == "groups" ? "neuOut" : ""}>
                    <Link to='/groups'>
                        <img style={{ height: "2rem", filter: active == "groups" ? "" : "grayscale(100%)" }} src={Groups}></img>
                    </Link>
                </div>
                <div className={active == "home" ? "neuOut" : ""}>
                    <Link to='/'>
                        <img style={{ height: "2rem", filter: active == "home" ? "" : "grayscale(100%)" }} src={Home}></img>
                    </Link>
                </div>
                <div className={active == "profile" ? "neuOut" : ""}>
                    <Link to='/profile'>
                        <img style={{ height: "2rem", filter: active == "profile" ? "" : "grayscale(100%)" }} src={Profile}></img>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default NavBar;
