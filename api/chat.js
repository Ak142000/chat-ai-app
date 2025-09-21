import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, image } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    let prompt = message;

    if (image) {
      prompt = `Describe this image: ${image}`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
