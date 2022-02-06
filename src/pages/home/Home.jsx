import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import TaskManager from "../../components/TaskManager";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router";
const db = getFirestore();
const Home = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();
    const handlers = useSwipeable({
        onSwipedLeft: function () {
            console.log("hi");
            navigate("/profile");
        },
        onSwipedRight: function () {
            console.log("hi");
            navigate("/groups");
        },
    });

    useEffect(() => {
        if (!loading) {
            if (user) {
            }
        }
    }, [user, loading]);

    return (
        <div className='padIn' {...handlers}>
            {/* Contains all of the tasks */}
            <TaskManager user={user}></TaskManager>
            {/* All just logic to display and remove the create and join group UI */}
        </div>
    );
};

export default Home;
