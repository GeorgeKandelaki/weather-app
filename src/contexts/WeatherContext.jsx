import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { isEmpty, formatDate } from "../utils/utils";
import APIWeather from "../services/apiWeather";
import { useUnits } from "./UnitsContext";

import iconSunny from "../assets/images/icon-sunny.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import { searchPlace } from "../services/apiSearch";

const WeatherContext = createContext();

// --- WEATHER ICON MAP ---
const weatherIcons = {
    0: iconSunny,
    1: iconPartlyCloudy,
    2: iconPartlyCloudy,
    3: iconOvercast,
    45: iconFog,
    48: iconFog,
    51: iconDrizzle,
    53: iconDrizzle,
    55: iconDrizzle,
    56: iconDrizzle,
    57: iconDrizzle,
    61: iconRain,
    63: iconRain,
    65: iconRain,
    66: iconRain,
    67: iconRain,
    71: iconSnow,
    73: iconSnow,
    75: iconSnow,
    77: iconSnow,
    80: iconRain,
    81: iconRain,
    82: iconRain,
    85: iconSnow,
    86: iconSnow,
    95: iconStorm,
    96: iconStorm,
    99: iconStorm,
};

function determineIcon(code) {
    return weatherIcons[code] || iconSunny;
}

function parseDailyWeather(data) {
    if (isEmpty(data)) return null;

    return data.time.map((date, i) => ({
        day: formatDate(date, { weekday: "short" }),
        maxTemp: data.temperature_2m_max[i],
        minTemp: data.temperature_2m_min[i],
        icon: determineIcon(data.weather_code[i]),
    }));
}

function parseHourlyWeather(data) {
    if (isEmpty(data)) return null;

    const hoursByDay = {};

    for (let i = 0; i < data.time.length; i += 24) {
        // Determine the day from the first hour in this 24-hour chunk
        const day = formatDate(data.time[i], { weekday: "long" }).toLowerCase();

        // Slice the next 24 hours (or less if at the end of the dataset)
        const hourlyChunk = data.time.slice(i, i + 24);

        hoursByDay[day] = hourlyChunk.map((date, j) => {
            const globalIndex = i + j; // Correct index for weather_code & temperature_2m
            return {
                icon: determineIcon(data.weather_code[globalIndex]),
                maxTemp: data.temperature_2m[globalIndex],
                hour: formatDate(date, { hour: "2-digit" }).split(",")[1].trim().replace(/^0/, "").replace(" ", ""), // clean leading zero
                weekday: day,
                id: globalIndex, // deterministic unique ID
            };
        });
    }

    return hoursByDay;
}

function WeatherProvider({ children }) {
    const { unitsObjAPI } = useUnits();

    // const [location, setLocation] = useState(() => {
    //     try {
    //         const stored = JSON.parse(localStorage.getItem("location"));
    //         return Array.isArray(stored) && stored.length ? stored : [];
    //     } catch {
    //         return [];
    //     }
    // });

    const [location, setLocation] = useState([41.8010843, 44.8051021]);

    const [currentWeather, setCurrentWeather] = useState({});
    const [dailyForecast, setDailyForecast] = useState({});
    const [hourlyForecast, setHourlyForecast] = useState({});
    const [day, setDay] = useState(() => formatDate(Date.now(), { weekday: "long" }).toLowerCase());

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [isSearching, setIsSearching] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const weatherRef = useRef(new APIWeather(location[0], location[1], unitsObjAPI));

    const days = useMemo(
        () =>
            ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((value) => ({
                label: value[0].toUpperCase() + value.slice(1),
                value,
                handleClick: () => setDay(value),
            })),
        []
    );

    const dailyForecastObj = useMemo(() => parseDailyWeather(dailyForecast), [dailyForecast]);
    const hourlyForecastObj = useMemo(() => parseHourlyWeather(hourlyForecast), [hourlyForecast]);

    const searchForAPlace = useCallback(async function (name) {
        setIsSearching(true);
        try {
            const data = await searchPlace(name);

            setSearchResults(data.results);
            return data.results;
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        if (location.length) return; // skip if already saved

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = [pos.coords.latitude, pos.coords.longitude];
                setLocation(coords);
                localStorage.setItem("location", JSON.stringify(coords));
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Unable to get your location.");
                setIsLoading(false);
            }
        );
    }, []);

    // --- Update APIWeather instance when location or units change ---
    useEffect(() => {
        if (!location.length) return;
        weatherRef.current.setCoordinates(location[0], location[1]).setUnits(unitsObjAPI);
    }, [location, unitsObjAPI]);

    // --- Fetch Weather Data ---
    useEffect(() => {
        if (!location.length) return;

        async function getData() {
            setIsLoading(true);
            setError(null);

            try {
                const [current, hourly, daily] = await Promise.all([
                    weatherRef.current.getCurrentWeather(),
                    weatherRef.current.getHourlyWeather(),
                    weatherRef.current.getDailyWeather(),
                ]);

                // enrich current
                current.current.city = current.timezone.split("/")[1];
                current.current.icon = determineIcon(current.current.weather_code);

                setCurrentWeather(current.current);
                setHourlyForecast(hourly.hourly);
                setDailyForecast(daily.daily);
            } catch (err) {
                console.error("Weather fetch error:", err);
                setError("Failed to fetch weather data.");
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [location, unitsObjAPI]);

    return (
        <WeatherContext.Provider
            value={{
                location,
                setLocation,
                currentWeather,
                dailyForecast,
                hourlyForecast,
                dailyForecastObj,
                hourlyForecastObj,
                days,
                day,
                isLoading,
                error,
                unitsObjAPI,
                search,
                setSearch,
                searchForAPlace,
                searchResults,
                isSearching,
                setIsSearching,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}

function useWeather() {
    const context = useContext(WeatherContext);
    if (context === undefined) throw new Error("useWeather must be used within WeatherProvider");
    return context;
}

export { useWeather, WeatherProvider };
