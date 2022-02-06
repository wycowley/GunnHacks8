import Task from "./Task";
import { useState } from "react";
import { useEffect } from "react";
import data from "../tasklist.json";
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
const TaskManager = (props) => {
    // todays tasks
    const [tasks, setTasks] = useState([
        { description: "Say hello to someone you don't know", points: 3 },
        { description: "Pick up 10 pieces of trash", points: 3 },
        { description: "Call a family member", points: 3 },
        { description: "Give a stranger a compliment", points: 3 },
        { description: "help me im a poor old grandma", points: 3 },
    ]);
    const [todaysTasks, setTodaysTasks] = useState([false, false, false, false, false]);
    const [goldMedal, setGoldMedal] = useState(false);
    const [silverMedal, setSilverMedal] = useState(false);

    useEffect(() => {
        console.log(data);
        let taskIndeces = data.dates[getDate()];
        let temp = [];
        taskIndeces.forEach((index) => {
            temp.push(data.list[index]);
        });
        setTasks(temp);
    }, []);
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
    const keepTrack = (checkData) => {
        console.log(checkData);
        let temp = todaysTasks;
        temp[checkData.index] = checkData.completed;
        setTodaysTasks(temp);
        checkForMedal(checkData.justStarted);
    };
    const checkForMedal = async (justStarted) => {
        let count = 0;
        let previousGoldMedal = goldMedal;
        let previousSilverMedal = silverMedal;
        todaysTasks.forEach((task) => {
            if (task) {
                count++;
            }
        });
        if (count == 4) {
            setGoldMedal(true);
            setSilverMedal(false);
        } else if (count == 3) {
            setGoldMedal(false);
            setSilverMedal(true);
        } else if (count == 2) {
            setGoldMedal(false);
            setSilverMedal(false);
        }
        if (!justStarted) {
            // then update firestore
            const userRef = doc(db, "users", props.user.uid);
            if (count == 4) {
                if (previousSilverMedal) {
                    await updateDoc(userRef, { goldMedals: increment(1), silverMedals: increment(-1) });
                } else {
                    await updateDoc(userRef, { goldMedals: increment(1) });
                }
            } else if (count == 3) {
                // remove one gold medals
                if (previousGoldMedal) {
                    await updateDoc(userRef, { goldMedals: increment(-1), silverMedals: increment(1) });
                } else {
                    await updateDoc(userRef, { silverMedals: increment(1) });
                }
            } else if (count == 2) {
                if (previousSilverMedal) {
                    await updateDoc(userRef, { silverMedals: increment(-1) });
                }
            }
        }
    };
    return (
        <div className=''>
            {/* <h1 className='marBot'>Tasks for today:</h1> */}
            {goldMedal && (
                <div className='neuOut padIn2 marBot'>
                    <h2 style={{ textAlign: "center" }}>🥇 achieved today!</h2>
                </div>
            )}
            {silverMedal && (
                <div className='neuOut padIn2 marBot'>
                    <h2 style={{ textAlign: "center" }}>🥈 achieved today!</h2>{" "}
                </div>
            )}
            {tasks.map((task, index) => {
                console.log(task);
                console.log(task.img);
                return (
                    <Task
                        key={index}
                        keyU={index}
                        points={task.points}
                        index={index}
                        description={task.description}
                        img={task.img}
                        user={props.user}
                        onSelected={keepTrack}
                    />
                );
            })}
        </div>
    );
};
export default TaskManager;
