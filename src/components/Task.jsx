import { useEffect, useState, useRef } from "react";

const Task = ({ points, description, user }, ...props) => {
    const checkbox = useRef(null);

    const updatePoints = async () => {};
    return (
        <div>
            <input type='checkbox' onClick={updatePoints} ref={checkbox}></input>
            <p>{description}</p>
            <p>{points} points</p>
        </div>
    );
};
export default Task;
