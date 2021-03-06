import { useEffect, useState, useRef } from "react";
import {
    getFirestore,
    updateDoc,
    arrayUnion,
    doc,
    collection,
    setDoc,
    getDoc,
    addDoc,
    where,
    getDocs,
    query,
    orderBy,
    limit,
    serverTimestamp,
    increment,
    writeBatch,
} from "firebase/firestore";
const db = getFirestore();
const Task = ({ points, description, user, index, onSelected, img, keyU }, ...props) => {
    const checkbox = useRef(null);
    const [userQuestionRef, setUserQuestionRef] = useState(null);
    const [alreadyCreatedFirestore, setAlreadyCreatedFirestore] = useState(false);

    const [cbChecked, setCbChecked] = useState(false);

    // first it needs to check if it has already been checked
    useEffect(() => {
        if (user) {
            console.log(index);
            getMatchingPrompt();
        }
    }, [user, points, description]);
    const getMatchingPrompt = async () => {
        // needs to match the same date, and the same description
        const userTasks = collection(doc(db, "users", user.uid), "tasks");
        const q1 = query(userTasks, where("description", "==", description), where("date", "==", getDate()), limit(1));
        const oneMatching = await getDocs(q1);

        console.log(oneMatching);
        oneMatching.forEach((data) => {
            setUserQuestionRef(data.ref);
            console.log(data.data(), data.id);
            setAlreadyCreatedFirestore(true);
            checkbox.current.checked = data.data().completed;
            setCbChecked(data.data().completed);
            onSelected({ index: index, completed: data.data().completed, justStarted: true });
        });
    };
    const updateMatchingPrompt = async () => {
        console.log(checkbox.current.checked);
        if (alreadyCreatedFirestore) {
            await updateDoc(userQuestionRef, { completed: checkbox.current.checked });
        } else {
            setAlreadyCreatedFirestore(true);
            console.log("hello");
            const oneMatching = await addDoc(collection(doc(db, "users", user.uid), "tasks"), {
                description: description,
                date: getDate(),
                completed: checkbox.current.checked,
            });
            setUserQuestionRef(oneMatching);
        }
    };
    const getDate = () => {
        let month = new Date().getMonth() + 1 + "";
        if (month < 10) {
            month = "0" + month;
        }
        let day = new Date().getDate() + "";
        if (day < 10) {
            day = "0" + day;
        }
        return month + day;
    };
    const updatePoints = async () => {
        setCbChecked(checkbox.current.checked);
        const batch = writeBatch(db);

        updateMatchingPrompt();
        const userRef = doc(db, "users", user.uid);
        const userDocument = await getDoc(userRef);
        var change;
        if (checkbox.current.checked === true) {
            change = points;
        } else {
            change = 0 - points;
        }
        for (let i = 0; i < userDocument.data().groups.length; i++) {
            let idOfGroup = userDocument.data().groups[i].id;
            const userDocumentInGroup = doc(doc(db, "groups", idOfGroup), "points", user.uid);
            batch.update(userDocumentInGroup, { total: increment(change) });
        }
        // update total points, total transactions, and daily points

        if (userDocument.data().dailyPoints[getDate()] === undefined) {
            let dailyPoints = userDocument.data().dailyPoints;
            let totalPoints = userDocument.data().totalPoints + change;
            let totalGood = userDocument.data().totalGood + 1;

            if (checkbox.current.checked === false) {
                totalGood -= 2;
            }

            dailyPoints[getDate()] = change;
            batch.update(userRef, { dailyPoints: dailyPoints, totalPoints: totalPoints, totalGood: totalGood });
        } else {
            let dailyPoints = userDocument.data().dailyPoints;
            let totalPoints = userDocument.data().totalPoints + change;
            let totalGood = userDocument.data().totalGood + 1;

            if (checkbox.current.checked === false) {
                totalGood -= 2;
            }
            dailyPoints[getDate()] = dailyPoints[getDate()] + change;
            batch.update(userRef, { dailyPoints: dailyPoints, totalPoints: totalPoints, totalGood: totalGood });
        }
        onSelected({ index: index, completed: checkbox.current.checked, justStarted: false });

        await batch.commit();
    };

    return (
        <div className='neuOut padIn marBot'>
            <p className='neuIn padIn2 marBot'>{description}</p>
            <img style={{ width: "100%" }} className='marBot' src={`/images/${img}.svg`}></img>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <p className='neuIn padIn2'>
                    {points} {points == 1 ? "point" : "points"}
                </p>
                <div style={{ flex: 1 }}></div>
                <input id={`check${keyU}`} style={{ display: "none" }} className='neuOut padIn2' type='checkbox' onClick={updatePoints} ref={checkbox}></input>
                <label for={`check${keyU}`} className={`padIn2 ${checkbox?.current?.checked ? "neuIn" : "neuOut"}`}>
                    <strong>???</strong>
                </label>
            </div>
        </div>
    );
};
export default Task;
