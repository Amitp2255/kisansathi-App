import { WeatherData } from '../types';

const API_KEY = '3e4b095324674f78975141352251009';
const API_URL = 'https://api.weatherapi.com/v1/forecast.json';
// Using a CORS proxy to prevent cross-origin errors.
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

// A mapping from WeatherAPI condition codes to our icon keys
// Documentation: https://www.weatherapi.com/docs/weather_conditions.json
const mapConditionToIcon = (code: number): string => {
    // Clear/Sunny
    if (code === 1000) return 'Sun';
    // Cloudy variants
    if (code === 1003) return 'CloudSun'; // Partly cloudy
    if (code === 1006 || code === 1009) return 'Cloud'; // Cloudy, Overcast
    // Rain variants
    if (code === 1063 || code === 1150 || code === 1153 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1240 || code === 1243 || code === 1246) return 'CloudRain';
    // Thunder
    if (code === 1087 || code === 1273 || code === 1276) return 'CloudRain'; // Represent thunderstorms as rain
    // Snow variants
    if (code >= 1210 && code <= 1225 || code === 1066 || code === 1114 || code === 1117) return 'CloudSnow';
    
    // Default to cloudy sun for mist, fog, etc.
    return 'CloudSun';
};


export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        const targetUrl = `${API_URL}?key=${API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(targetUrl)}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data via proxy: ${response.statusText}`);
        }
        
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || 'An error occurred while fetching weather data.');
        }

        return {
            current: {
                temp: Math.round(data.current.temp_c),
                description: data.current.condition.text,
                icon: mapConditionToIcon(data.current.condition.code),
                humidity: data.current.humidity,
                wind: Math.round(data.current.wind_kph),
                location: `${data.location.name}, ${data.location.region}`
            },
            daily: data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                day: new Date(day.date).toLocaleString('en-US', { weekday: 'short' }),
                min: Math.round(day.day.mintemp_c),
                max: Math.round(day.day.maxtemp_c),
                icon: mapConditionToIcon(day.day.condition.code),
                description: day.day.condition.text,
            }))
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (error instanceof SyntaxError) { // Catches JSON parsing errors from proxy returning non-JSON
            throw new Error("Received an invalid response from the weather server. It might be temporarily down.");
        }
        if (error instanceof Error && error.message.includes('proxy')) {
             throw new Error("The weather service is currently unavailable. Please try again later.");
        }
        // Rethrow other specific errors from the service
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Could not retrieve weather information. Please check your connection and try again.');
    }
};
