import app from '../config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default async function  loginwithGoogle() {
    let result = null, error = null;

    try {
        result = await signInWithPopup(auth, provider);
    } catch (err) {
        error = err;
    }

    return { result, error };
}

export {provider}