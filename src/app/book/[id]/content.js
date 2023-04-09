'use client'

import {useState} from 'react'

export default function Content({content}) {

  const [currentTopic, setCurrentTopic] = useState(content[0])


  const [currentAssessment, setCurrentAssessment] = useState()
  const [assessmentActive, setAssessmentActive] = useState(false)

  const updateContent = (i) => setCurrentTopic(content[i])

  const axios = require("axios");

  async function generateQuestions(){
    const prompt = currentTopic.text
    
    await axios.post("/api/generatequestion/", {
      'prompt': {prompt}
    }).then(async (data) => {
      console.log(data.data.data.choices)
      setCurrentAssessment(data.data.data.choices[0].message.content)
      setAssessmentActive(true)
    }).catch(function (error) {
      console.log(error);
    });
  }

  const goBack = () => setAssessmentActive(false)

  return (
    <div className="relative grid grid-cols-[auto_1fr] grid-rows-1 max-h-full cursor-pointer h-[80vh]">
      <div className="sidebar overflow-y-scroll rounded-lg border-2 py-5 px-5 bg-[white]">
        {content.map((topic, index) => {
          return(
            <p key={index} className='py-3 px-3 mb-5 border-2 bg-primary rounded-lg' onClick={() => {updateContent(index)}}>{topic.heading}</p>
          )
        })}
      </div>
      <div className="relative overflow-y-scroll p-8 ml-8 rounded-lg border-2 bg-[white]">

        {assessmentActive?
        <>
        <p className='text-xl font-bold mb-5'>{JSON.parse(currentAssessment)['questions'][0].question}</p>
          <ul className=' list-disc'>
            {console.log(JSON.parse(currentAssessment)['questions'])}
            {JSON.parse(currentAssessment)['questions'][0].options.map((question) =>{
              return(
                <li>{question}</li>
              )
            })}
          </ul>
        </>:
        <>
        <p className='text-xl font-bold mb-5'>{currentTopic.heading}</p>

        <ul className=' list-disc'>
          <div>{currentTopic.text.map((point) => <li>{point}</li>)}</div>
        </ul>
        </>
        }

          <div className="flex relative bottom-0 left-0 py-5 px-3 bg-gradient-to-t from-white w-full">
            <button  className="relative inline-block text-lg group">
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">See Flashcards</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
            </button>

            {assessmentActive? 
            <button className="inline-block text-lg group ml-3" onClick={goBack}>
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">{assessmentActive? "Go Back" : "Take Assessment"}</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
            </button> : 
            <button className="inline-block text-lg group ml-3" onClick={generateQuestions}>
            <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">{assessmentActive? "Go Back" : "Take Assessment"}</span>
            </span>
            <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"></span>
            </button>}
        </div>
      </div>
  </div>
  )
}
