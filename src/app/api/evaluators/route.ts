import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { attemptData, quizContext } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are an expert AI evaluator for a vocational High School platform teaching "Basic Electricity".
Please analyze the student's exam performance below:

Quiz Context: ${JSON.stringify(quizContext)}
Student Attempt Data: ${JSON.stringify(attemptData)}

Provide a detailed HTML-formatted (or markdown-formatted) analysis including:
1. Identifying their strengths.
2. Identifying weaknesses or areas of misunderstanding.
3. Suggesting specific actions or simulations they should retry.
Output the analysis directly, no pleasantries.
`;

    const result = await model.generateContent(prompt);
    
    return NextResponse.json({ analysis: result.response.text() });
  } catch (error) {
    console.error("Evaluator API Error:", error);
    return NextResponse.json({ error: "Failed to evaluate performance" }, { status: 500 });
  }
}
