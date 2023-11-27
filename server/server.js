import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from "openai";

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
  

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const task = req.body.task;
    console.log(req.body);
    // const task = req.body.;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `${task}`
        },
        {
          "role": "user",
          "content": `${prompt}`
        }
      ],
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    // console.log(completion.choices[0].message.content);
    res.status(200).send({
      bot: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))