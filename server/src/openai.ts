'''
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ParsedTask {
  title: string;
  startTime?: string;
  priority?: 'low' | 'medium' | 'high';
}

export async function parseTask(text: string): Promise<ParsedTask> {
  const prompt = `
    Parse the following natural language text into a structured JSON object.
    The JSON object should have the following fields:
    - "title" (string, required): The summary of the task.
    - "startTime" (string, optional): The start time of the task in ISO 8601 format. If no time is mentioned, this field should be null.
    - "priority" (string, optional): The priority of the task, which can be "low", "medium", or "high". Default to "medium" if not specified.

    The current time is ${new Date().toISOString()}.
    Assume the user is in the Australia/Melbourne timezone (AEST, UTC+10 or AEDT, UTC+11 depending on daylight saving).

    Text to parse: "${text}"

    Output only the JSON object.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    if (response.choices[0].message.content) {
      return JSON.parse(response.choices[0].message.content);
    }
    throw new Error("Failed to parse task: Empty response from OpenAI");

  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to parse task with OpenAI");
  }
}
'''
