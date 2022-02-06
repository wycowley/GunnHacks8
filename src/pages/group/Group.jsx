import { useParams } from "react-router";
const Group = () => {
    let { id } = useParams();
    console.log(id);

    return (
        <div>
            <h1>Group</h1>
        </div>
    );
};
export default Group;
