import { MarketData } from '../types';

/**
 * Generates mock historical price data for chart display.
 * @param currentPrice - The current price to base the history on.
 * @param days - The number of historical days to generate.
 * @param volatility - A factor for price fluctuation (e.g., 0.015 for 1.5%).
 * @returns An array of historical price points.
 */
const generateHistory = (currentPrice: number, days: number, volatility: number = 0.02): { date: string; price: number }[] => {
    const history = [];
    let price = currentPrice;
    const priceHistory = [price];

    // Generate prices backwards from today
    for (let i = 0; i < days - 1; i++) {
        const fluctuation = (Math.random() - 0.48) * volatility; // small daily fluctuation
        price = price / (1 + fluctuation);
        priceHistory.unshift(price);
    }
    
    // Create date-price pairs
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        history.push({
            date: date.toISOString().split('T')[0],
            price: Math.round(priceHistory[i])
        });
    }

    return history;
};


// Base prices for mock data generation
const basePrices: { [key: string]: number } = {
    "Wheat": 2350, // INR per quintal
    "Rice": 3800,
    "Cotton": 7200,
    "Soyabean": 4600,
    "Mustard": 5400,
};

/**
 * Generates a complete mock MarketData object.
 * @param crop The name of the crop.
 * @param region The name of the region.
 * @returns A mock MarketData object.
 */
const generateMockMarketData = (crop: string, region: string): MarketData => {
    const basePrice = basePrices[crop] || 3000;
    
    // Create a simple hash from strings to introduce deterministic variance
    const stringToHash = (s: string) => s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0);
    
    const varianceFactor = ((stringToHash(crop) % 100) + (stringToHash(region) % 100)) / 1000; // +/- 0 to 20%
    const currentPrice = Math.round(basePrice * (1 + varianceFactor));

    const history = generateHistory(currentPrice, 90);

    const yesterdayPrice = history[history.length - 2]?.price || currentPrice * 0.99;
    const changePct = parseFloat(((currentPrice - yesterdayPrice) / yesterdayPrice * 100).toFixed(2));

    return {
        crop: crop,
        region: region,
        current: {
            price_per_qtl: currentPrice,
            market: `${region} APMC`, // Use a more realistic market name
            change_pct: changePct,
        },
        history: history
    };
};

/**
 * Fetches market data for a given crop and region.
 * This is a mock implementation that generates realistic data to ensure app functionality.
 */
export const getMarketData = async (crop: string, region: string): Promise<MarketData> => {
    console.log(`Fetching mock market data for ${crop} in ${region}`);
    return new Promise((resolve) => {
        // Simulate network delay to mimic a real API call
        setTimeout(() => {
            try {
                const data = generateMockMarketData(crop, region);
                resolve(data);
            } catch (error) {
                // This part is for robustness, though the mock should not fail.
                console.error("Error generating mock market data:", error);
                const mockError = new Error("Failed to generate market data. Please try again.");
                // In a real app, you would reject the promise here.
                // For the demo, we resolve with a fallback to avoid crashing the UI.
                resolve(generateMockMarketData('Wheat', 'Punjab'));
            }
        }, 600 + Math.random() * 400); // Add some jitter to the delay
    });
};