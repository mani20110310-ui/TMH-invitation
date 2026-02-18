
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getInspirationTips = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "为天目湖造梦者计划生成5个极具创意且符合小红书风格的'灵感锦囊'。例如：做一个水上书店？做一个悬崖秋千？文案要潮，要短。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING }
            },
            required: ['text']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      { text: "做一个湖畔透明直播间？" },
      { text: "在水杉林里办一场电子乐晚宴？" },
      { text: "废弃码头改造为日落电影院？" },
      { text: "漂浮在湖上的艺术冥想空间？" },
      { text: "给天目湖的鱼画一组波普艺术墙？" }
    ];
  }
};

/**
 * Generates a collage-style image of Tianmu Lake scenery.
 */
export const generateCollageImage = async (prompt: string) => {
  try {
    const finalPrompt = `A high-quality collage art of Tianmu Lake, ${prompt}. 
    Style: Mixed media collage with paper cut-outs, high-saturation photography segments, 
    and hand-drawn sketches. Colors: vibrant blue (#2D9CDB), lush green (#27AE60), and sun yellow (#F2C94C). 
    Elements: lake water, bamboo forests, mountains. 
    Mood: Artistic, modern, Xiaohongshu aesthetic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: finalPrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return "https://picsum.photos/seed/tianmu/1080/1920"; // Fallback
  }
};
