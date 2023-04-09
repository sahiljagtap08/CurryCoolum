import app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(app);

export default async function logOut() {
    let result = null, error = null;
    try {
        result = await  signOut(auth);
    } catch (err) {
        error = err;
    }

    return { result, error };
}