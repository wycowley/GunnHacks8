import { useRef } from "react";
import { useForm } from "react-hook-form";
import { getFirestore, updateDoc, arrayUnion, doc, collection, setDoc, getDoc, addDoc } from "firebase/firestore";
const db = getFirestore();
const CreateGroup = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        createNewGroup(data.name);
    };
    const createNewGroup = async (name) => {
        // console.log(props.user);
        const userRef = doc(db, "users", props.user.uid);
        const groupDocument = await addDoc(collection(db, "groups"), { name: name, members: [props.user.uid] });
        const pointDocument = await setDoc(doc(doc(db, "groups", groupDocument.id), "points", props.user.uid), {
            total: 0,
            displayName: props.user.displayName,
            profileImg: props.user.photoURL,
        });
        const userDocument = await updateDoc(userRef, { groups: arrayUnion({ name: name, id: groupDocument.id }) });
        props.setShowCreateGroup(false);
    };

    return (
        <div className='neuOut padIn marBot'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                {/* include validation with required or other standard HTML validation rules */}
                <input className='neuIn padIn2 wideButton marBot' placeholder='Group name...' {...register("name", { required: true })} />

                <input className='neuOut padIn2 wideButton' type='submit' value={"Create Group"} />
            </form>
        </div>
    );
};
export default CreateGroup;
