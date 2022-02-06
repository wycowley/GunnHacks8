import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, doc, collection, getDoc } from "firebase/firestore";
const db = getFirestore();
const Profile = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const [totalGood, setTotalGood] = useState(0);
    const [total, setTotalPoints] = useState(0);
    const [userData, setUserData] = useState(null);

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
    };
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
};
export default Profile;
