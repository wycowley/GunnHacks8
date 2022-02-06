import { Link } from "react-router-dom";
import "./components.css";
const NavBar = () => {
    return (
        <div class='navbar'>
            <div>
                <Link to='/groups'>Groups</Link>
            </div>
            <div>
                <Link to='/'>Home</Link>
            </div>
            <div>
                <Link to='/profile'>Profile</Link>
            </div>
        </div>
    );
};
export default NavBar;
