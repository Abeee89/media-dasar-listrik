import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build the system prompt using context if provided
    const systemInstruction = `You are a helpful, expert AI tutor for a vocational high school platform teaching "Basic Electricity". 
Current Page Context: ${context || 'None provided.'}
Address the user as a student. Keep answers concise, educational, and engaging.`;

    const chat = model.startChat({
        systemInstruction,
        history: messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.content }]
        }))
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
