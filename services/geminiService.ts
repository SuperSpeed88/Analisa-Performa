
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A concise, one-paragraph summary of the employee's performance."
    },
    strengths: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A specific, positive performance point."
      },
      description: "A list of the employee's key strengths."
    },
    areasForImprovement: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A specific, constructive area for improvement."
      },
      description: "A list of areas where the employee can improve."
    }
  },
  required: ["summary", "strengths", "areasForImprovement"],
};


export async function analyzePerformance(text: string): Promise<AnalysisResult> {
  const prompt = `Analyze the following employee performance review text and provide a structured analysis. Identify the key strengths and areas for improvement.

Review Text:
---
${text}
---
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are an expert HR analyst. Your task is to analyze employee performance reviews and provide a concise, structured analysis in JSON format based on the provided schema.",
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });
    
    const responseText = response.text;
    if (!responseText) {
      throw new Error("Received an empty response from the API.");
    }

    const parsedResult: AnalysisResult = JSON.parse(responseText);
    return parsedResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
}
