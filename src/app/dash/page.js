"use client"

import { useState, useEffect} from "react"

import { DashboardContext } from '../context/DashboardContext';
import Dashboard from "../dashboard/Dashboard";

export default function Page({searchParams}) {

  const axios = require("axios");
  // const {url} = searchParams;

  const [data, setData] = useState({
    'data': null
  })

  const [current, setCurrent] = useState({
    'current': {}
  })
  
  const [questionActive, setQuestionActive] = useState(false)

  const value = {data, setData ,current, setCurrent, questionActive, setQuestionActive}

  useEffect(() => {
    axios.get(`/api/getText/`).then((data) => {
      setData(data?.data.response[0])
      setCurrent(data?.data?.response.summary[0])})
  },[])

  return(
    <DashboardContext.Provider value={value}>
      <Dashboard/>
    </DashboardContext.Provider>
  )
}