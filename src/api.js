// src/api.js

export async function chatWithAI(message) {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  if (!API_KEY) {
    throw new Error("API key not found. Please check your .env file.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message || "Something went wrong with AI request");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
