import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import CreateGroup from "./CreateGroup";
import { Link } from "react-router-dom";
const db = getFirestore();
const Home = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [groups, setGroups] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    useEffect(() => {
        if (!loading) {
            if (user) {
                loadInUserDoc();
            }
        }
    }, [user, loading]);

    const loadInUserDoc = async () => {
        const userRef = doc(db, "users", user.uid);
        const document = await getDoc(userRef);
        setGroups(document.data().groups);
    };
    return (
        <div>
            {groups.map((group, index) => {
                <Link to={"/group/" + group?.id} key={index}>
                    <div>{group?.name}</div>
                </Link>;
            })}
            <button
                onClick={() => {
                    setShowCreateGroup(!showCreateGroup);
                }}>
                Create Group
            </button>
            {showCreateGroup ? <CreateGroup setShowCreateGroup={setShowCreateGroup} user={user} /> : <></>}
        </div>
    );
};

export default Home;
