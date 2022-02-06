import Task from "./Task";
import { useState } from "react";
import { useEffect } from "react";
import data from "../tasklist.json";
const TaskManager = (props) => {
    // todays tasks
    const [tasks, setTasks] = useState([
        { description: "Say hello to someone you don't know", points: 3 },
        { description: "Pick up 10 pieces of trash", points: 3 },
        { description: "Call a family member", points: 3 },
        { description: "Give a stranger a compliment", points: 3 },
        { description: "help me im a poor old grandma", points: 3 },
    ]);
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
    return (
        <div>
            <h1>Tasks for today:</h1>
            {tasks.map((task, index) => {
                return <Task key={index} points={task.points} description={task.description} user={props.user} />;
            })}
        </div>
    );
};
export default TaskManager;
