import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { getFirestore, doc, collection, setDoc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
const db = getFirestore();
const Leaderboard = (props) => {
    const [user, loading, error] = useAuthState(getAuth());
    const [points, setPoints] = useState([{}]);
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
        const pointsRef = query(collection(groupRef, "points"), orderBy("total", "desc"));

        const querySnapshot = await getDocs(pointsRef);
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
        <div className='neuOut padIn  marBot'>
            <h1 className='neuIn padIn2 marBot' style={{ textAlign: "center" }}>
                {name}
            </h1>
            {points.map((data, index) => {
                return (
                    <div className='neuOut padIn2  marBot' style={{ display: "flex", justifyContent: "center", alignItems: "center" }} key={index}>
                        {/* number of points user has */}
                        <h1>{data?.points}</h1>
                        {/* display name of user */}
                        <div style={{ flex: 1, textAlign: "center" }}>
                            <h1 style={{ fontSize: "1rem" }}>{data?.name}</h1>
                        </div>
                        {/* profile img */}
                        <img style={{ height: "2rem", borderRadius: "50%" }} src={data?.profileImg}></img>
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
