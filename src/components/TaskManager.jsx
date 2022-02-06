import Task from "./Task";
import { useState } from "react";
import { useEffect } from "react";
const TaskManager = (props) => {
    // todays tasks
    const [tasks, setTasks] = useState([
        { description: "Say hello to someone you don't know", points: 3 },
        { description: "Pick up 10 pieces of trash", points: 3 },
        { description: "Call a family member", points: 3 },
        { description: "Give a stranger a compliment", points: 3 },
        { description: "Leave a nice note on someone's car", points: 3 },
    ]);
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
