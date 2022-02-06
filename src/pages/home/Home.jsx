import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import TaskManager from "../../components/TaskManager";
import { Link } from "react-router-dom";
const db = getFirestore();
const Home = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [groups, setGroups] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showJoinGroup, setShowJoinGroup] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (user) {
            }
        }
    }, [user, loading]);

    return (
        <div>
            {/* Contains all of the tasks */}
            <TaskManager user={user}></TaskManager>
            {/* All just logic to display and remove the create and join group UI */}
            <button
                onClick={() => {
                    setShowCreateGroup(!showCreateGroup);
                }}>
                Create Group
            </button>
            <button
                onClick={() => {
                    setShowJoinGroup(!showJoinGroup);
                }}>
                Join Group
            </button>
            {showCreateGroup ? <CreateGroup setShowCreateGroup={setShowCreateGroup} user={user} /> : <></>}
            {showJoinGroup ? <JoinGroup setShowJoinGroup={setShowJoinGroup} user={user} /> : <></>}
        </div>
    );
};

export default Home;
