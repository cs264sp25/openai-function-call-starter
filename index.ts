import OpenAI from "openai";
import { OPENAI_API_KEY } from "./env";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function chat(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.tool_calls;
}

chat("What is the weather in Baltimore?").then(console.log);
