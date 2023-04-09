import { db } from '../../../firebase/config';
import { doc, getDoc } from "firebase/firestore";

import Content from './content'

async function getData(id){

  const docRef = doc(db, "curriculum", id);

  let tempData = []
  const book = await getDoc(docRef).then((data) => {tempData.push({...data.data(), id: data.id })});

  console.log(book);

  return {...tempData[0]};
}

export default async function Page({params, children}) {
  const {id} = params

  const data = await getData(id);

  return (
    <Content content={data.content}/>
  )
}