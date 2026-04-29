import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "ai";
  content: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
  context?: string;
};

export async function POST(req: Request) {
  try {
    const rawBody: unknown = await req.json();
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { messages, context } = rawBody as Partial<ChatRequestBody>;
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build the system prompt using context if provided
    const systemInstruction = `You are a helpful, expert AI tutor for a vocational high school platform teaching "Basic Electricity". 
Current Page Context: ${context || 'None provided.'}
Address the user as a student. Keep answers concise, educational, and engaging.`;

    const history = messages.slice(0, -1).flatMap((m): ChatMessage[] => {
      if (!m || typeof m !== "object") return [];
      const { role, content } = m as Partial<ChatMessage>;
      if ((role !== "user" && role !== "ai") || typeof content !== "string") return [];
      return [{ role, content }];
    });

    const chat = model.startChat({
        systemInstruction,
        history: history.map((m) => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.content }]
        })),
    });

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage !== "object") {
      return NextResponse.json({ error: "Invalid last message" }, { status: 400 });
    }

    const { content: lastContent } = lastMessage as Partial<ChatMessage>;
    if (typeof lastContent !== "string" || lastContent.trim().length === 0) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const result = await chat.sendMessage(lastContent);
    
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to generate reply" }, { status: 500 });
  }
}
