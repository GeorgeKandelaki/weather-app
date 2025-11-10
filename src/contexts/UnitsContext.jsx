import { createContext, useContext, useState, useMemo } from "react";

const UnitsContext = createContext();

function UnitsProvider({ children }) {
    const [temperature, setTemperature] = useState("celsius");
    const [windSpeed, setWindSpeed] = useState("kmh");
    const [precipitation, setPrecipitation] = useState("mm");

    const options = useMemo(
        () => ({
            temperature: [
                {
                    label: "Celsius (C)",
                    value: "celsius",
                    active: temperature === "celsius",
                    handleClick: () => setTemperature("celsius"),
                },
                {
                    label: "Fahrenheit (F)",
                    value: "fahrenheit",
                    active: temperature === "fahrenheit",
                    handleClick: () => setTemperature("fahrenheit"),
                },
            ],
            wind_speed: [
                { label: "km/h", value: "kmh", active: windSpeed === "kmh", handleClick: () => setWindSpeed("kmh") },
                { label: "mph", value: "mph", active: windSpeed === "mph", handleClick: () => setWindSpeed("mph") },
            ],
            precipitation: [
                {
                    label: "Millimeters (mm)",
                    value: "mm",
                    active: precipitation === "mm",
                    handleClick: () => setPrecipitation("mm"),
                },
                {
                    label: "Inches",
                    value: "inch",
                    active: precipitation === "inch",
                    handleClick: () => setPrecipitation("inch"),
                },
            ],
        }),
        [temperature, windSpeed, precipitation]
    );

    const unitsObjAPI = useMemo(
        () => ({
            temperature_unit: temperature,
            wind_speed_unit: windSpeed,
            precipitation_unit: precipitation,
        }),
        [temperature, windSpeed, precipitation]
    );

    return (
        <UnitsContext.Provider
            value={{
                options,
                unitsObjAPI,
                temperature,
                setTemperature,
                windSpeed,
                setWindSpeed,
                precipitation,
                setPrecipitation,
            }}
        >
            {children}
        </UnitsContext.Provider>
    );
}

function useUnits() {
    const context = useContext(UnitsContext);

    if (context === undefined) throw new Error("UnitsContext was used outside of the scope of UnitsProvider.");

    return context;
}

export { useUnits, UnitsProvider };
