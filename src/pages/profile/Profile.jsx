import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
const db = getFirestore();
const Profile = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [totalGood, setTotalGood] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [userData, setUserData] = useState({});
    const [dailyPoints, setDailyPoints] = useState({});
    const [goldMedals, setGoldMedals] = useState(0);
    const [silverMedals, setSilverMedals] = useState(0);

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
        setUserData(document.data());
        setTotalGood(document.data().totalGood);
        setTotalPoints(document.data().totalPoints);
        setDailyPoints(document.data().dailyPoints);
        setGoldMedals(document.data().goldMedals);
        setSilverMedals(document.data().silverMedals);
        // dail
    };
    const getGraphData = () => {};
    return (
        <div>
            <h1>Profile</h1>
            <img src={userData?.profileImg}></img>
            <h2>{goldMedals} gold medals</h2>
            <h2>{silverMedals} silver medals</h2>

            <h2>{totalPoints} total points</h2>
            <h2>{totalGood} total good actions</h2>
            {/* TODO: ADD GRAPH HERE USING dailyPoints   */}
        </div>
    );
};
export default Profile;
