import { DashboardContext } from '../context/DashboardContext';
import { useContext, useState  } from 'react';

import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';

export default function Content() {

  const [loading, setLoading] = useState(false)
  const [question, setQuestion] = useState(false)

  const axios = require("axios");

  const context = useContext(DashboardContext);
  let current = context.current

  
  async function handleClick(){

    // console.log(context.current)
    setLoading(true)

    let promptString = ""

    context.current.text.map((text) => {
      promptString = promptString.concat(text)
    })

    // console.log(promptString)

    await axios.post("/api/generateq/", {
      'prompt': promptString
    }).then((data) => {
      console.log(data.data.data[0].choices[0].text)
      setQuestion(data.data.data[0].choices[0].text)
      setLoading(false)
      context.setQuestionActive(true)
    }).catch(function (error) {
      console.log(error);
      alert('error')
      setLoading(false)
    });
  }

  async function goBack(){
    context.setQuestionActive(false)
  }
  
  return (
    <div style={{padding: '10px 20px'}}>
      {context.questionActive ?
      
        <>
        <h1 style={{paddingBottom: '20px'}}>Questions</h1>
        <p>
          {question}
        </p>
        <Button style={{marginTop: '20px'}} variant="contained" onClick={() => goBack()}>Go Back</Button>
        {loading ? <CircularProgress /> : <></>}
        </>
      :
        <>
        <h1 style={{paddingBottom: '20px'}}>{current.heading}</h1>
          <ul>
            {current?.text?.map((point) => (
                <li style={{paddingBottom: '10px'}}>{point}</li>
            ))}
          </ul>
          <Button style={{marginTop: '20px'}} variant="contained" onClick={() => handleClick()}>Take Quiz</Button>
          {loading ? <CircularProgress /> : <></>}
        </>
      }
    </div>


  );
}
