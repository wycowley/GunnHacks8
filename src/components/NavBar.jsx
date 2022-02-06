import { Link, useLocation } from "react-router-dom";
import "./components.css";
import { useEffect, useState } from "react";

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
    console.log(location.pathname);
    return (
        <div className='navbar'>
            <div>
                <div>
                    <Link to='/groups'>Groups</Link>
                </div>
                <div className='home-container'>
                    <Link to='/'>Home</Link>
                </div>
                <div>
                    <Link to='/profile'>Profile</Link>
                </div>
            </div>
        </div>
    );
};
export default NavBar;
