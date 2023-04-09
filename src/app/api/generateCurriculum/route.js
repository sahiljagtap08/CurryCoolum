// import { NextRequest, NextResponse } from 'next/server'

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI,
// });

// const openai = new OpenAIApi(configuration);

// export async function POST(NextRequest) {

//   const body = await NextRequest.json()
//   const prompt = body['prompt']

//   // console.log(prompt)

//   try {
//       // const response = await openai.createCompletion({
//       //     model: "text-davinci-003",
//       //     prompt: `"${prompt}" generate four multiple choice questions with four options one of which is correct, also provide do not provide the answer and order them as a key value pair json with no newline and easily parsable format`,
//       //     temperature: 0.7,
//       //     max_tokens: 256,
//       //     top_p: 1,
//       //     frequency_penalty: 0,
//       //     presence_penalty: 0,
//       //   });

//       const response = await openai.createCompletion({
//         model: "gpt-4-32k",
//         prompt: `${} generate pointers and descriptions from the given content`,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//       });
  
//         const data = [response.data]

//         // console.log(response)
  
//       return NextResponse.json({ data }, { status: 200 })
//     } catch (error) {
//       console.log(error);
//       return NextResponse.json({ error }, { status: 200 })
//     }
// }

import { NextRequest, NextResponse } from 'next/server'

const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: process.env.OPENAI,
  });

const openai = new OpenAIApi(configuration);

export async function POST(NextRequest) {

    const axios = require("axios");

    const body = await NextRequest.json()

  try {

    const options = {
        method: 'POST',
        url: 'https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-url/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.RAPIDAPI,
          'X-RapidAPI-Host': 'tldrthis.p.rapidapi.com'
        },
        data: `{"url":"${body['url']}","num_sentences":10,"is_detailed":true}`
      };
    
      const { data, error } = await axios.request(options)
      const response = data

      console.log('done')
    
    //   if (error) throw new Error(error)


    const summary = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role: "user", content: `"${response.article_text}" from the above text extract the main topics and give me atleast 2 paragraphs with a list of few detailed pointers for each of them to help me understand the topics better, and put them in a json format`}],
    });

    const test = summary.data
    console.log(test.choices[0].message)
  
      return NextResponse.json({ test }, { status: 200 })
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 200 })
    }
}