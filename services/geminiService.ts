
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMoodFromPhoto = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
          { text: "Analyze the person's mood in this photo. Provide a mood score from 1-10 (1 is very sad/tired, 10 is extremely happy). Also provide a brief reason." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Mood score from 1 to 10" },
            reason: { type: Type.STRING, description: "Short description of the mood detected" }
          },
          required: ["score", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Mood analysis error:", error);
    return { score: 5, reason: "Unable to analyze mood, defaulted to neutral." };
  }
};

export const generateHealthInsight = async (outingsData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the following outing data for an elderly person today, provide a caring insight for their child. 
      Data: ${JSON.stringify(outingsData)}
      The insight should be in Chinese and sound like a helpful assistant.`,
      config: {
        systemInstruction: "You are a professional geriatric psychologist and elder-care assistant.",
      }
    });
    return response.text;
  } catch (error) {
    return "今日活动规律，建议晚饭后给妈妈打个电话，分享一下您一天的趣事。";
  }
};
