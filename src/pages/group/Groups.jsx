import { useParams } from "react-router";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard";
const db = getFirestore();

const Groups = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [leaderboardIds, setLeaderboardIds] = useState([]);
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
        console.log(document.data().groups);
    };

    return (
        <div>
            {leaderboardIds.map((data, index) => {
                // renders each of the leaderboards for each group that you are in
                return <Leaderboard key={data.id} id={data.id} />;
            })}
        </div>
    );
};
export default Groups;
