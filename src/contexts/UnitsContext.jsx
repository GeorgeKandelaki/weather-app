import { createContext, useContext, useState, useMemo } from "react";

const UnitsContext = createContext();

function UnitsProvider({ children }) {
    const [temperature, setTemperature] = useState("celsius");
    const [windSpeed, setWindSpeed] = useState("kmh");
    const [precipitation, setPrecipitation] = useState("mm");

    const options = useMemo(
        () => ({
            temperature: [
                { label: "Celsius (C)", value: "celsius", active: true, handleClick: setTemperature("celsius") },
                {
                    label: "Fahrenheit (F)",
                    value: "fahrenheit",
                    active: false,
                    handleClick: setTemperature("fahrenheit"),
                },
            ],
            wind_speed: [
                { label: "km/h", value: "kmh", active: true, handleClick: setWindSpeed("kmh") },
                { label: "mph", value: "mph", active: false, handleClick: setWindSpeed("mph") },
            ],
            precipitation: [
                { label: "Millimeters (mm)", value: "mm", active: true, handleClick: setPrecipitation("mm") },
                { label: "Inches", value: "inch", active: false, handleClick: setPrecipitation("inch") },
            ],
        }),
        []
    );

    return (
        <UnitsContext.Provider
            value={{
                options,
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
