"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import { useAuthContext } from './context/AuthContext';
import logOut  from '../firebase/auth/logout'


export default function page() {

  const [inputValue, setInputValue] = useState("");
  const { user } = useAuthContext()

  const router = useRouter();

  useEffect(() => {
      if (user == null) router.push("/auth/login")
  }, [user])
  
  const onChange = e => {
    setInputValue(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    router.push(`/dash/?url=${inputValue}`)
  }

  return (
    <>
      {user ? 
      <>
          <form onSubmit={handleSubmit}>
          <input type="text" placeholder='url' name='url' onChange={onChange} />
          <button>Generate</button>
        </form>

        <button onClick={logOut}>logout</button>
        </>
        :
        <></>}
    </>
  )
}