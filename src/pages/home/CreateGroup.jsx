import { useRef } from "react";
import { useForm } from "react-hook-form";
import { getFirestore, updateDoc, arrayUnion, doc, collection, setDoc } from "firebase/firestore";
const CreateGroup = (props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {};

    return (
        <div>
            <h1>Create Group</h1>
            <p>Name of Group</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}

                {/* include validation with required or other standard HTML validation rules */}
                <input {...register("name", { required: true })} />

                <input type='submit' />
            </form>
        </div>
    );
};
export default CreateGroup;
