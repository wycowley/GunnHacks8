import { useRef } from "react";
import { useForm } from "react-hook-form";
import { getFirestore, updateDoc, arrayUnion, doc, collection, setDoc, getDoc, addDoc } from "firebase/firestore";
const db = getFirestore();
const JoinGroup = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createNewGroup(data.id);
    };
    const createNewGroup = async (id) => {
        // console.log(props.user);
        const userRef = doc(db, "users", props.user.uid);
        const groupRef = doc(db, "groups", id);
        const groupDocument = await getDoc(groupRef);
        if (groupDocument.exists()) {
            const userDocument = await updateDoc(userRef, { groups: arrayUnion({ id: id, name: groupDocument.data().name }) });
            await setDoc(doc(collection(groupRef, "points"), props.user.uid), { total: 0, displayName: props.user.displayName, profileImg: props.user.photoURL });
        } else {
            window.alert("Group does not exist");
        }
        // const groupDocument = await addDoc(collection(db, "groups"), { name: name, members: [props.user.uid] });
        // const pointDocument = await setDoc(doc(doc(db, "groups", groupDocument.id), "points", props.user.uid), { total: 0, displayName: props.user.displayName, profileImg: props.user.photoURL });
        // const userDocument = await updateDoc(userRef, { groups: arrayUnion({ name: name, id: groupDocument.id }) });
    };

    return (
        <div>
            <h1>Join Group</h1>
            <p>Group ID</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("id", { required: true })} />

                <input type='submit' />
            </form>
        </div>
    );
};
export default JoinGroup;
