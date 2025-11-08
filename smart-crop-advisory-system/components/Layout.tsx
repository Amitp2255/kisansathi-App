import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types';
import { ArrowLeft, Wind, Droplets, Sun, Cloud, CloudRain, CloudSun, CloudSnow, LucideProps, Loader2, AlertCircle, Lightbulb, X } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { getWeatherData } from '../services/weatherService';
import { getWeatherAdvisory } from '../services/geminiService';

const weatherIcons: { [key: string]: React.ReactElement<LucideProps> } = {
  "Sun": <Sun className="w-20 h-20 text-yellow-500" />,
  "Cloud": <Cloud className="w-20 h-20 text-gray-400" />,
  "CloudRain": <CloudRain className="w-20 h-20 text-blue-500" />,
  "CloudSun": <CloudSun className="w-20 h-20 text-yellow-600" />,
  "CloudSnow": <CloudSnow className="w-20 h-20 text-blue-200" />,
};

const smallWeatherIcons: { [key: string]: React.ReactElement<LucideProps> } = {
  "Sun": <Sun className="w-8 h-8 text-yellow-500" />,
  "Cloud": <Cloud className="w-8 h-8 text-gray-400" />,
  "CloudRain": <CloudRain className="w-8 h-8 text-blue-500" />,
  "CloudSun": <CloudSun className="w-8 h-8 text-yellow-600" />,
  "CloudSnow": <CloudSnow className="w-8 h-8 text-blue-200" />,
};

const PageHeader: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (
  <header className="bg-brand-header p-4 flex items-center text-white sticky top-0 z-10 shadow-sm">
    <button onClick={onBack} className="mr-4 p-1 rounded-full hover:bg-white/20" aria-label="Go back">
      <ArrowLeft className="w-6 h-6" />
    </button>
    <h1 className="text-xl font-bold">{title}</h1>
  </header>
);

// Calculates distance between two coordinates in kilometers.
function haversineDistance(coords1: {lat: number, lon: number}, coords2: {lat: number, lon: number}): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
    const dLon = (coords2.lon - coords1.lon) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

const WeatherPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLocalization();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [advisory, setAdvisory] = useState<string | null>(null);
  const [isAdvisoryLoading, setIsAdvisoryLoading] = useState(false);
  const [lastCoords, setLastCoords] = useState<{lat: number, lon: number} | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchWeatherAndAdvisory = useCallback(async (lat: number, lon: number, isInitialLoad: boolean = false) => {
    if (isInitialLoad && !weather) { // Only show full loading screen if no cached data
        setLoading(true);
    }
    setError(null);
    try {
        const data = await getWeatherData(lat, lon);
        if (data.daily.length > 0) {
            data.daily[0].day = 'Today';
        }

        // Check for significant weather changes for notification
        if (weather && data.daily.length > 1 && weather.daily.length > 1 && data.daily[1].description.toLowerCase().includes('rain') && !weather.daily[1].description.toLowerCase().includes('rain')) {
            setNotification("Heads up! Rain is now forecast for tomorrow.");
        }

        setWeather(data);
        localStorage.setItem('weatherCache', JSON.stringify({ data, coords: { lat, lon } }));

        // Fetch AI advisory
        setIsAdvisoryLoading(true);
        getWeatherAdvisory(data)
            .then(setAdvisory)
            .catch(err => console.error("Failed to get AI advisory", err))
            .finally(() => setIsAdvisoryLoading(false));

    } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
        if (isInitialLoad) {
            setLoading(false);
        }
    }
  }, [weather]);

  useEffect(() => {
    // 1. Load from cache first for offline fallback
    const cachedDataString = localStorage.getItem('weatherCache');
    if (cachedDataString) {
        try {
            const { data, coords } = JSON.parse(cachedDataString);
            setWeather(data);
            setLastCoords(coords);
        } catch (e) {
            console.error("Failed to parse weather cache", e);
            localStorage.removeItem('weatherCache');
        }
    }

    const handlePositionUpdate = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const newCoords = { lat: latitude, lon: longitude };

        const isFirstFetch = !lastCoords;
        const hasMoved = lastCoords && haversineDistance(lastCoords, newCoords) > 2; // more than 2km

        if (isFirstFetch || hasMoved) {
            console.log(isFirstFetch ? "First location fetch." : "Location changed > 2km, updating weather.");
            setLastCoords(newCoords);
            fetchWeatherAndAdvisory(latitude, longitude, isFirstFetch);
        } else if (loading) {
            // This handles the case where we have cached data but no live location yet.
            setLoading(false);
        }
    };
    
    const handlePositionError = (err: GeolocationPositionError) => {
        console.warn(`Geolocation error: ${err.message}. Falling back to default location.`);
        if (!weather) { // Only fetch fallback if no data (not even cached)
            fetchWeatherAndAdvisory(23.2599, 77.4126, true); // Fallback to Bhopal, India
        } else {
            setLoading(false); // We have cached data, so stop loading indicator
            setError("Could not get your location. Displaying last known weather.");
        }
    };

    let watchId: number | null = null;
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(handlePositionUpdate, handlePositionError, {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 300000,
        });
    } else {
        console.warn("Geolocation is not supported. Falling back to a default location.");
        fetchWeatherAndAdvisory(23.2599, 77.4126, true);
    }
    
    // 2. Set up auto-refresh interval
    const intervalId = setInterval(() => {
        if (lastCoords) {
            console.log("Auto-refreshing weather data (15 mins).");
            fetchWeatherAndAdvisory(lastCoords.lat, lastCoords.lon);
        }
    }, 15 * 60 * 1000); // 15 minutes

    // 3. Cleanup
    return () => {
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run this setup effect only once on mount


  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-brand-bg min-h-screen">
        <PageHeader title={t('weather.title')} onBack={onBack} />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-black">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p>{t('weather.fetching')}</p>
        </div>
      </div>
    );
  }

  if (!weather) { // This now only shows if there's no data at all (not even cached)
    return (
      <div className="max-w-md mx-auto bg-brand-bg min-h-screen">
        <PageHeader title={t('weather.title')} onBack={onBack} />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-red-600 p-4 text-center">
          <AlertCircle className="w-10 h-10 mb-4" />
          <p className="font-semibold text-lg">{t('weather.error.title')}</p>
          <p className="text-sm">{error || t('weather.error.message')}</p>
        </div>
      </div>
    );
  }
  
  const { current, daily } = weather;

  return (
    <div className="max-w-md mx-auto bg-brand-bg min-h-screen">
      <PageHeader title={t('weather.title')} onBack={onBack} />
      <main className="p-4 space-y-4">
        {/* Notification Banner */}
        {notification && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg shadow-md flex justify-between items-center animate-fade-in-up" role="alert">
                <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-3"/>
                    <p className="text-sm font-medium">{notification}</p>
                </div>
                <button onClick={() => setNotification(null)} className="ml-2 p-1 text-yellow-500 hover:text-yellow-800" aria-label="Dismiss">
                    <X className="w-4 h-4" />
                </button>
            </div>
        )}

        {/* Error message for non-critical errors (e.g., location fail with cache) */}
        {error && !loading && (
             <div className="bg-red-100 text-red-700 p-3 rounded-xl flex items-center text-sm shadow-md" role="alert">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
            </div>
        )}

        {/* Current Weather */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg text-black text-center animate-fade-in-up">
            <p className="font-semibold">{current.location}</p>
            <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-20 h-20">{weatherIcons[current.icon] || <CloudSun className="w-20 h-20 text-yellow-600" />}</div>
                <div>
                    <p className="text-6xl font-bold">{current.temp}°</p>
                    <p className="text-lg -mt-1">{current.description}</p>
                </div>
            </div>
            <div className="flex justify-around text-sm">
                <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span>{current.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span>{current.wind} km/h</span>
                </div>
            </div>
        </div>

        {/* AI Advisory */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-lg text-black animate-fade-in-up" style={{animationDelay: '150ms'}}>
            <h2 className="text-lg font-semibold mb-2 px-2 flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-yellow-500"/>{t('weather.aiAdvisoryTitle')}</h2>
            {isAdvisoryLoading ? (
                 <div className="flex items-center text-sm text-gray-600">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/> {t('weather.generatingAdvisory')}
                </div>
            ) : (
                <p className="text-sm text-black">{advisory || "Could not generate advisory at this time."}</p>
            )}
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-lg text-black animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <h2 className="text-lg font-semibold mb-2 px-2">{t('weather.forecastTitle')}</h2>
            <div className="space-y-2">
                {daily.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-100">
                        <p className="font-semibold w-12">{day.day === 'Today' ? t('weather.today') : day.day}</p>
                        <div className="flex items-center gap-2">
                            {smallWeatherIcons[day.icon] || <CloudSun className="w-8 h-8 text-yellow-600" />}
                            <span className="text-sm hidden sm:inline">{day.description}</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                            <span>{day.max}°</span>
                            <span className="text-gray-500">{day.min}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default WeatherPage;