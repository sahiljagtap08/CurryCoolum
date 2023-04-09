"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import { useAuthContext } from '../context/AuthContext';

import { app, db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

export default function page() {

  const { user } = useAuthContext()

  const router = useRouter();

  const [url, setUrl] = useState();

  const axios = require("axios");

  useEffect(() => {
      if (user == null) router.push("/auth/login")
  }, [user])

  const handleChange = (e) => {
    setUrl(e.target.value)
  }

  async function handleClick(prompt){
    await axios.post("/api/getText/", {
      'url': url
    }).then(async (data) => {
        // console.log(data.data.response.article_title);

        await addDoc(collection(db, "curriculum"), 
        { 
            uid: user.uid|| null,
            title: data.data.response.article_title || null,
            content: data.data.response.summary || null
        });
        
        router.push('/home')
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
      <>
      {user ? 
        <div className="container flex  flex-col items-start">
            <input type="text" placeholder="Enter Resource URL" className="rounded-lg  text-lg px-5 py-3 mb-5 w-9/12 border-2" onChange={handleChange}/>

            <button onClick={handleClick}  className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Make CurryCoolum</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
            </button>
        </div>  
        :
        <></>}
    </>
  )
}
