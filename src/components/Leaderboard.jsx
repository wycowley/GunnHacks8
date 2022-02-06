import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { getFirestore, doc, collection, setDoc, getDoc, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
const db = getFirestore();
const Leaderboard = (props) => {
    const [user, loading, error] = useAuthState(getAuth());
    const [points, setPoints] = useState([{ name: "", points: 0 }]);
    const [name, setName] = useState("");
    const inviteButton = useRef(null);
    useEffect(() => {
        if (!loading) {
            if (user) {
                loadInPoints();
            }
        }
    }, [loading, user]);
    // loads in all of the points that have been recorded already
    const loadInPoints = async () => {
        const groupRef = doc(db, "groups", props.id);
        const pointsRef = collection(groupRef, "points");

        const querySnapshot = await getDocs(pointsRef, orderBy("total", "desc"));
        const basicData = await getDoc(groupRef);
        setName(basicData.data().name);

        let tempPoints = [];
        querySnapshot.forEach((doc) => {
            tempPoints.push({ name: doc.data().displayName, points: doc.data().total, profileImg: doc.data().profileImg });
        });
        setPoints(tempPoints);
    };
    // handles the copying
    const invite = () => {
        navigator.clipboard.writeText(props.id);
        inviteButton.current.innerHTML = "Copied!";
        setTimeout(() => {
            inviteButton.current.innerHTML = "Invite!";
        }, 1000);
    };
    return (
        <div>
            <h1>{name}</h1>
            {points.map((data, index) => {
                return (
                    <div key={index}>
                        {/* number of points user has */}
                        <h1>{data.points}</h1>
                        {/* display name of user */}
                        <h1>{data.name}</h1>
                        {/* profile img */}
                        <img src={data.profileImg}></img>
                    </div>
                );
            })}
            {/* copies the firebase id */}
            <button onClick={invite} ref={inviteButton}>
                Invite
            </button>
        </div>
    );
};
export default Leaderboard;
