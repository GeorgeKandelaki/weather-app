import { createContext, useContext, useEffect, useState } from "react";
import { useUnits } from "./UnitsContext";
import APIWeather from "../services/apiWeather";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
    const { temperature, unitsObjAPI } = useUnits();

    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [day, setDay] = useState("Monday");
    const [isLoading, setIsLoading] = useState(true);

    const Weather = new APIWeather(52.52, 13.41, unitsObjAPI);

    useEffect(function () {
        console.log("WeatherProvider Works!");
    }, []);

    return <WeatherContext.Provider value={{ currentWeather }}>{children}</WeatherContext.Provider>;
}

function useWeather() {
    const context = useContext(WeatherContext);

    if (context === undefined) throw new Error("WeatherContext was used outside of the scope of WeatherProvider");

    return context;
}

export { useWeather, WeatherProvider };
