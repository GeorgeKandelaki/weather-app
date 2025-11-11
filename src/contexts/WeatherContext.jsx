import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useUnits } from "./UnitsContext";
import APIWeather from "../services/apiWeather";

const WeatherContext = createContext();
/*
WMO Weather interpretation codes (WW)
Code	Description
0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
*/

function WeatherProvider({ children }) {
    const { unitsObjAPI } = useUnits();

    const [location, setLocation] = useState([]);
    const [currentWeather, setCurrentWeather] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [day, setDay] = useState("monday");
    const [isLoading, setIsLoading] = useState(true);

    const weatherRef = useRef(new APIWeather(location[0], location[1], unitsObjAPI));

    const days = useMemo(
        () => [
            {
                label: "Monday",
                value: "monday",
                handleClick: () => setDay("monday"),
            },
            {
                label: "Tuesday",
                value: "tuesday",
                handleClick: () => setDay("tuesday"),
            },
            {
                label: "Wednesday",
                value: "wednesday",
                handleClick: () => setDay("wednesday"),
            },
            {
                label: "Thursday",
                value: "thursday",
                handleClick: () => setDay("thursday"),
            },
            {
                label: "Friday",
                value: "friday",
                handleClick: () => setDay("friday"),
            },
            {
                label: "Saturday",
                value: "saturday",
                handleClick: () => setDay("saturday"),
            },
            {
                label: "Sunday",
                value: "sunday",
                handleClick: () => setDay("sunday"),
            },
        ],
        []
    );

    useEffect(function () {
        navigator.geolocation.getCurrentPosition((position) => {
            setIsLoading(true);
            setLocation([position.coords.latitude, position.coords.longitude]);
            setIsLoading(false);
        });
    }, []);

    useEffect(
        function () {
            if (!location) return null;

            weatherRef.current.setCoordinates(location[0], location[1]).setUnits(unitsObjAPI);
        },
        [location, unitsObjAPI]
    );

    useEffect(
        function () {
            if (!location.length) return;

            async function getData() {
                setIsLoading(true);
                const currentWeather = await weatherRef.current.getCurrentWeather();
                const hourlyWeather = await weatherRef.current.getHourlyWeather();
                const dailyWeather = await weatherRef.current.getDailyWeather();

                setCurrentWeather(currentWeather.current);
                setHourlyForecast(hourlyWeather.hourly);
                setDailyForecast(dailyWeather.daily);
                setIsLoading(false);
            }

            getData();
        },
        [location, unitsObjAPI]
    );

    if (isLoading) return null;

    return (
        <WeatherContext.Provider
            value={{
                location,
                setLocation,
                setCurrentWeather,
                setDailyForecast,
                setHourlyForecast,
                currentWeather,
                days,
                day,
                hourlyForecast,
                dailyForecast,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}

function useWeather() {
    const context = useContext(WeatherContext);

    if (context === undefined) throw new Error("WeatherContext was used outside of the scope of WeatherProvider");

    return context;
}

export { useWeather, WeatherProvider };
