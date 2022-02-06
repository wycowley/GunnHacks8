import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
import { Line, LineChart, ResponsiveContainer, XAxis } from "recharts";
import { auth } from "../login/SignIn";
import { useNavigate } from "react-router";
import { useSwipeable } from "react-swipeable";
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

    const navigate = useNavigate();
    const handlers = useSwipeable({
        onSwipedLeft: function () {
            console.log("hi");
            navigate("/groups");
        },
        onSwipedRight: function () {
            console.log("hi");
            navigate("/");
        },
    });
    let graphData = [
        { date: "0202", value: 1 },
        { date: "0203", value: 3 },
        { date: "0204", value: 20 },
        { date: "0205", value: 12 },
    ];
    Object.keys(dailyPoints).forEach(function (name) {
        graphData.push({ date: name, value: dailyPoints[name] });
    });
    console.log(graphData);
    const getGraphData = () => {};
    return (
        <div className='padIn' {...handlers}>
            <div className='marBot' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className='neuOut padIn2' style={{ borderRadius: "100%", width: "10rem" }}>
                    <img style={{ height: "8rem" }} src={userData?.profileImg}></img>
                </div>
            </div>
            <h1 className='marBot' style={{ textAlign: "center" }}>
                {user?.displayName}
            </h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                {[...Array(goldMedals)].map(function (index) {
                    return (
                        <div key={index + "g"} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button className='neuOut padIn2 medal'>🥇</button>
                        </div>
                    );
                })}
                {[...Array(silverMedals)].map(function (index) {
                    return (
                        <div key={index + "s"} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button className='neuOut padIn2 medal'>🥈</button>
                        </div>
                    );
                })}
            </div>
            <div className='neuOut padIn marBot'>
                <ResponsiveContainer width={"100%"} height={150}>
                    <LineChart width={400} height={400} data={graphData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <XAxis dataKey='date' strokeWidth={3} stroke='var(--text)' />
                        {/* <Tooltip /> */}
                        {/* <CartesianGrid stroke='#f5f5f5' /> */}
                        <Line type='monotone' dataKey='value' stroke='var(--text)' strokeWidth={3} yAxisId={0} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className='neuOut padIn marBot' style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{totalPoints}</h1>
                    <h2 style={{ textAlign: "center" }}>points</h2>
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{totalGood}</h1>
                    <h2 style={{ textAlign: "center" }}>actions</h2>
                </div>
            </div>

            <button
                className='neuOut wideButton marBot'
                onClick={() => {
                    signOut(auth);
                }}>
                Sign Out
            </button>
            {/* TODO: ADD GRAPH HERE USING dailyPoints   */}
        </div>
    );
};
export default Profile;
