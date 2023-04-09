"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import { useAuthContext } from '../context/AuthContext';

import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";

import NewBookButton from '../component/newBookButton'

export default function page() {

  const [data, setData] = useState()
  const { user } = useAuthContext()

  const router = useRouter();

  useEffect(() => {
      if (user == null) router.push("/auth/login")
  }, [user])

  useEffect(() => {
    const q = query(collection(db, "curriculum"), where("uid", "==", user.uid));

    const getBooks = async () => {

      let tempData = []

      await getDocs(q).then((data) => {data.docs.map((item) => {
        tempData.push({...item.data(), id: item.id })
        });
      })

      setData(tempData)
    }
    getBooks(); 
  }, []);

  return (
      <>
      {user ? 
        <>

        {console.log(data)}
        <div className='py-8'>
          {data?.map((book) => {return(
              <div onClick={() => router.push(`/book/${book.id}`)} className="list py-5 px-6 mb-5 bg-[white] cursor-pointer">
                <p className='text-lg font-sem'>{book.title}</p>
              </div>
            )})}

            <NewBookButton/>
        </div>
          {/* {console.log(data)} */}
        </>
        :
        <></>}
    </>
  )
}
