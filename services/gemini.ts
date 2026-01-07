
import { GoogleGenAI } from "@google/genai";

// Always initialize the client using process.env.API_KEY in a named parameter object.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Update generateResponse to use the existing client instance and include conversation history.
export const generateResponse = async (prompt: string, history: { role: string, parts: { text: string }[] }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    // Passing the history allows the model to maintain context across multi-turn conversations.
    history: history,
    config: {
      systemInstruction: `تۆ ناڤێ تە "بیرهات AI"یە. تۆ هاریکارەکێ ژیری کو تەنێ و تەنێ ب دیالێکتێ کوردیێ بادینی (Duhok/Zakho dialect) دئاخڤی.
      
      یاسایێن تە یێن جێگیر:
      1. تەنێ بەرسفا پرسیارێن دەربارەی "موبایلان" و "سوشیال میدیایێ" بدە.
      2. ب چو شێوەیان ب زمانەکێ دی نەئاخڤە. تەنێ بادینی.
      3. بەرسفێن تە با کورت و زەلال و پراکتیکی بن.
      4. تۆ تەنێ "بیرهات AI" ی و چو پەیوەندی ب کۆمپانیێن دی ڤە نینە.`,
    }
  });

  const result = await chat.sendMessage({ message: prompt });
  // Directly access the .text property from the GenerateContentResponse.
  return result.text;
};

// Use models.generateContent for single-turn text tasks like translation.
export const translateText = async (text: string, targetLang: 'badini' | 'english' | 'arabic') => {
  const langContext = {
    badini: "Pure Kurdish Badini dialect (Behdinan style).",
    english: "Natural and professional English.",
    arabic: "Modern Standard Arabic."
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { text: `Translate this text into ${targetLang}. Context: ${langContext[targetLang]}. Do not add explanations.
        
        TEXT: "${text}"` }
      ]
    }
  });

  return response.text;
};

// Fix the missing exported member error by implementing generateKurdishArt.
// This function uses the gemini-2.5-flash-image model for image generation.
export const generateKurdishArt = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: `Generate a high-quality artistic image inspired by Kurdish culture and this prompt: ${prompt}. The image should be vibrant and culturally authentic.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  // Extract the image data from the response candidates as per guidelines.
  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }
  }
  
  throw new Error("ببورە، من نەشیا چو وێنە بۆ تە چێ بکەم. جارەکا دی تاقی بکە.");
};
