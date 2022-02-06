import { useNavigate, useParams } from "react-router";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
import CreateGroup from "../home/CreateGroup";
import JoinGroup from "../home/JoinGroup";
import { useSwipeable } from "react-swipeable";
const db = getFirestore();

const Groups = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [leaderboardIds, setLeaderboardIds] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [showJoinGroup, setShowJoinGroup] = useState(false);
    useEffect(() => {
        if (!loading) {
            if (user) {
                loadInUserDoc();
            }
        }
    }, [user, loading]);
    const loadInUserDoc = async () => {
        console.log("Help");
        const userRef = doc(db, "users", user.uid);
        const document = await getDoc(userRef);
        setLeaderboardIds(document.data().groups);
    };

    const navigate = useNavigate();
    const handlers = useSwipeable({
        onSwipedLeft: function () {
            console.log("hi");
            navigate("/");
        },
        onSwipedRight: function () {
            console.log("hi");
            navigate("/profile");
        },
    });
    return (
        <div className='padIn' {...handlers}>
            {leaderboardIds.length == 0 && !loadingGroups ? <h1>You don't have Groups yet!</h1> : <></>}
            {leaderboardIds.map((data, index) => {
                // renders each of the leaderboards for each group that you are in
                return <Leaderboard key={data.id} id={data.id} />;
            })}
            <div>
                <button
                    className='neuOut wideButton marBot'
                    onClick={() => {
                        setShowCreateGroup(!showCreateGroup);
                        if (showJoinGroup) setShowJoinGroup(false);
                    }}>
                    Create Group
                </button>
                <button
                    className='neuOut wideButton marBot'
                    onClick={() => {
                        setShowJoinGroup(!showJoinGroup);
                        if (showCreateGroup) setShowCreateGroup(false);
                    }}>
                    Join Group
                </button>
            </div>
            {showCreateGroup ? <CreateGroup setShowCreateGroup={setShowCreateGroup} user={user} /> : <></>}
            {showJoinGroup ? <JoinGroup setShowJoinGroup={setShowJoinGroup} user={user} /> : <></>}
        </div>
    );
};
export default Groups;
