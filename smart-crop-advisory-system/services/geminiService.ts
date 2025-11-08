import { GoogleGenAI, Type, GenerateContentResponse, Chat } from "@google/genai";
import { CropRecommendation, PestAnalysis, MarketPrediction, IoTData, WeatherData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cropRecommenderSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      cropName: { type: Type.STRING, description: "Name of the recommended crop." },
      reason: { type: Type.STRING, description: "Detailed reason for recommending this crop based on the inputs." },
      expectedYield: { type: Type.STRING, description: "Expected yield in tonnes per hectare." },
      marketTrend: { type: Type.STRING, description: "Current market trend for this crop (e.g., High Demand, Stable, Volatile)." },
      fertilizerAdvice: { type: Type.STRING, description: "Specific fertilizer recommendation based on conditions. E.g., 'Soil is low in Nitrogen (N). Apply a top dressing of Urea within 15 days.'" },
      irrigationAdvice: { type: Type.STRING, description: "Specific irrigation advice. E.g., 'Irrigate within 24 hours due to low moisture.'" },
    },
    required: ["cropName", "reason", "expectedYield", "marketTrend"],
  },
};

const pestAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        disease: { type: Type.STRING, description: "Name of the identified plant disease or pest. If healthy, state 'Healthy'." },
        confidence: { type: Type.NUMBER, description: "Confidence score (0.0 to 1.0) of the identification." },
        description: { type: Type.STRING, description: "A brief description of the disease and its symptoms." },
        recommendedAction: { type: Type.STRING, description: "Immediate actions to take, including specific fertilizer or pesticide names if applicable." },
        preventiveMeasures: { type: Type.STRING, description: "Long-term preventive measures to avoid future outbreaks." },
    },
    required: ["disease", "confidence", "description", "recommendedAction", "preventiveMeasures"],
};

const marketPredictionSchema = {
    type: Type.OBJECT,
    properties: {
        prediction7day: { type: Type.STRING, description: "Predicted price range per quintal for the next 7 days (e.g., '₹2280 - ₹2350')." },
        reason7day: { type: Type.STRING, description: "Brief reason for the 7-day prediction based on trends." },
        prediction30day: { type: Type.STRING, description: "Predicted price range per quintal for the next 30 days (e.g., '₹2300 - ₹2400')." },
        reason30day: { type: Type.STRING, description: "Brief reason for the 30-day prediction based on market factors." },
    },
    required: ["prediction7day", "reason7day", "prediction30day", "reason30day"],
};

export const getCropRecommendation = async (
  soilType: string,
  waterAvailability: string,
  season: string,
  previousCrop: string,
  iotData?: IoTData
): Promise<CropRecommendation[]> => {
  const iotPromptPart = iotData
    ? `
    Real-time IoT Sensor Data:
    - Soil pH: ${iotData.ph.toFixed(1)}
    - Soil Moisture: ${iotData.moisture.toFixed(0)}%
    - Ambient Temperature: ${iotData.temperature.toFixed(0)}°C
    - Nitrogen (N): ${iotData.nitrogen.toFixed(0)} mg/kg
    - Phosphorus (P): ${iotData.phosphorus.toFixed(0)} mg/kg
    - Potassium (K): ${iotData.potassium.toFixed(0)} mg/kg
    
    Based on this sensor data, refine the recommendations. Provide specific, actionable advice.
    - If N, P, or K levels are low, suggest specific fertilizers (e.g., 'Low Nitrogen: Apply Urea.').
    - If moisture is critically low (e.g., < 30%), strongly advise for immediate irrigation.`
    : '';

  const prompt = `
    Analyze the following agricultural conditions for a small farm in India and recommend the top 3 most suitable crops.
    Also provide specific fertilizer and irrigation advice tailored to the sensor data.

    Conditions:
    - Soil Type: ${soilType}
    - Water Availability: ${waterAvailability}
    - Season: ${season}
    - Previously Cultivated Crop: ${previousCrop}
    ${iotPromptPart}

    Provide a detailed analysis for each recommendation, including the reason, expected yield, current market trends, and specific, actionable fertilizer and irrigation advice based on all available data.
  `;

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: cropRecommenderSchema,
      temperature: 0.5,
    },
  });
  
  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CropRecommendation[];
  } catch (error) {
    console.error("Error parsing crop recommendation JSON:", error);
    throw new Error("Failed to get crop recommendations. The AI model returned an unexpected format.");
  }
};

export const analyzePest = async (
  base64Image: string,
  mimeType: string
): Promise<PestAnalysis> => {
    const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
    };
    const textPart = {
        text: "Analyze this image of a plant leaf. Identify any diseases or pests. If the plant is healthy, state that. Provide a confidence score, a description of the issue, recommended immediate actions (including specific fertilizer or pesticide names), and long-term preventive measures."
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: 'application/json',
            responseSchema: pestAnalysisSchema,
            temperature: 0.2,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as PestAnalysis;
    } catch (error) {
        console.error("Error parsing pest analysis JSON:", error);
        throw new Error("Failed to analyze the image. The AI model returned an unexpected format.");
    }
};

export const getMarketPrediction = async (
    crop: string,
    region: string,
    history: { date: string; price: number }[]
): Promise<MarketPrediction> => {
    const prompt = `
        Act as an expert agricultural market analyst for the Indian market.
        Analyze the following historical price data for ${crop} in ${region}.

        Historical Data (last 30 days, price per quintal):
        ${JSON.stringify(history.slice(-30))}

        Based on this data and general market knowledge (e.g., seasonality, demand), provide a price forecast for the next 7 days and the next 30 days.
        Provide a brief, farmer-friendly reason for each prediction.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: marketPredictionSchema,
            temperature: 0.3,
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as MarketPrediction;
    } catch (error) {
        console.error("Error parsing market prediction JSON:", error);
        throw new Error("Failed to get market prediction. The AI model returned an unexpected format.");
    }
};


export const getWeatherAdvisory = async (weatherData: WeatherData): Promise<string> => {
    const forecastSummary = weatherData.daily.map(day => 
        `${day.day}: ${day.description}, Temp ${day.min}°C to ${day.max}°C.`
    ).join('\n');

    const prompt = `
        Act as an expert agricultural advisor for an Indian farmer.
        Given the following 7-day weather forecast, provide a short, actionable advisory (2-3 sentences).
        Focus on tasks like irrigation, fertilizer/pesticide application, and harvesting.
        Keep the advice concise and easy to understand.

        Weather Forecast:
        Current: ${weatherData.current.description}, ${weatherData.current.temp}°C
        ${forecastSummary}

        Advisory:
    `;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.4,
        },
    });

    return response.text;
};


let chat: Chat | null = null;
let lastLang: string | null = null;

const languageMap: { [key: string]: string } = {
  en: 'English',
  hi: 'Hindi',
  mr: 'Marathi',
  gu: 'Gujarati',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
  pa: 'Punjabi',
  bho: 'Bhojpuri',
  kn: 'Kannada',
  ml: 'Malayalam',
  or: 'Odia',
};

export const getChatbotResponse = async (message: string, lang: string): Promise<string> => {
    // Re-create chat session if language has changed
    if (!chat || lastLang !== lang) {
        lastLang = lang;
        const languageName = languageMap[lang] || 'English';
        
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are an AI-powered multilingual farming assistant called Krishi Mitra, part of the Kisan Sathi App project.
Your job is to understand and respond *only* in the language specified, which is: ${languageName}.

**Core Rules:**
1.  **Strict Language Adherence:** Generate your entire response exclusively in ${languageName}. Do not use English or any other language, unless a specific agricultural term has no common native translation.
2.  **No Formatting:** Your response must be plain text. Do not use markdown (like bold, italics, or lists with * or -), asterisks, or any special formatting characters.
3.  **Farmer-Friendly Tone:** Use simple, clear, and conversational language suitable for rural users and farmers who may have limited literacy.
4.  **Accurate Terminology:** Ensure agricultural terms (crop names, fertilizers, pests) are accurate in the target language.

**Example for a Hindi request:**
User: "धान के लिए कौन सी खाद सबसे अच्छी है?"
Your Correct Response (in Hindi): "धान के लिए यूरिया और डीएपी सबसे उपयोगी उर्वरक हैं। इन्हें सिंचाई के बाद डालना बेहतर रहेगा।"

**Your current task is to respond to the user's query in ${languageName}.**`,
            },
        });
    }

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
};