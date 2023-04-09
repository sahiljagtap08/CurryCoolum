import { NextResponse } from 'next/server'

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

    if (error) throw new Error(error)

    return NextResponse.json({ response }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}