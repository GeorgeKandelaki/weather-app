import { createContext, useContext, useState, useMemo, useEffect } from "react";

const UnitsContext = createContext();

function UnitsProvider({ children }) {
    const getStoredUnits = () => {
        try {
            const stored = JSON.parse(localStorage.getItem("units"));
            return (
                stored || {
                    temperature_unit: "celsius",
                    wind_speed_unit: "kmh",
                    precipitation_unit: "mm",
                }
            );
        } catch {
            return {
                temperature_unit: "celsius",
                wind_speed_unit: "kmh",
                precipitation_unit: "mm",
            };
        }
    };

    const stored = getStoredUnits();

    const [temperature, setTemperature] = useState(stored.temperature_unit);
    const [windSpeed, setWindSpeed] = useState(stored.wind_speed_unit);
    const [precipitation, setPrecipitation] = useState(stored.precipitation_unit);

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
                {
                    label: "km/h",
                    value: "kmh",
                    active: windSpeed === "kmh",
                    handleClick: () => setWindSpeed("kmh"),
                },
                {
                    label: "mph",
                    value: "mph",
                    active: windSpeed === "mph",
                    handleClick: () => setWindSpeed("mph"),
                },
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

    useEffect(() => {
        localStorage.setItem("units", JSON.stringify(unitsObjAPI));
    }, [unitsObjAPI]);

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
    if (!context) throw new Error("useUnits must be used within a UnitsProvider");
    return context;
}

export { useUnits, UnitsProvider };
