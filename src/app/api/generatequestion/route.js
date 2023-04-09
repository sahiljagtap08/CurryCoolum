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
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{role: "user", content: `${body['prompt']}" generate four multiple choice questions with four options one of which is correct, also provide provide the answer and order them as a key value pair json without newlines in the following format "{[{question: 'question', options: Array(4), correct_answer: 'answer'},{question: 'question', options: Array(4), correct_answer: 'answer'},{question: 'question', options: Array(4), correct_answer: 'answer'},{{question: 'question', options: Array(4), correct_answer: 'answer'}]}"`}],
    });

    const data = response.data
  
      return NextResponse.json({ data }, { status: 200 })
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error }, { status: 200 })
    }
}