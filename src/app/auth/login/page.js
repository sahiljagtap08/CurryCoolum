'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import loginwithGoogle from '../../../firebase/auth/googleAuth';
import { useAuthContext } from '../../context/AuthContext';

function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleForm = async (e) => {
        e.preventDefault()

        const { result, error } = await loginwithGoogle();

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push("/home")
    }

    return (
    <div className="wrapper">
        <div className="form-wrapper">
            <h1 className="mt-60 mb-30">Login</h1>
            <form onSubmit={handleForm} className="form">
                <label htmlFor="email">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label htmlFor="password">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password" />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
    );
}

export default Page;