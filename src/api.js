const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export async function chatWithAI(message) {
  if (!apiKey) {
    throw new Error("API key not found. Please check your .env file.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
<<<<<<< HEAD
      model: "gpt-4o-mini", // small, fast model
=======
      model: "gpt-3.5-turbo",
>>>>>>> 59a520c11134bedcc2cc2a6d7489c97b6f6fd814
      messages: [{ role: "user", content: message }],
    }),
  });

<<<<<<< HEAD
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
=======
  const data = await response.json();
  return data.choices[0].message.content;
}

export default { chatWithAI };
>>>>>>> 59a520c11134bedcc2cc2a6d7489c97b6f6fd814
