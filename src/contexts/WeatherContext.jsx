import { createContext, useContext, useEffect, useState } from "react";
import { useUnits } from "./UnitsContext";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
    const { temperature } = useUnits();
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [day, setDay] = useState("Monday");
    const [isLoading, setIsLoading] = useState(true);

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
