import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UnitsProvider } from "./contexts/UnitsContext.jsx";
import { WeatherProvider } from "./contexts/WeatherContext.jsx";

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <UnitsProvider>
        <WeatherProvider>
            <App />
        </WeatherProvider>
    </UnitsProvider>
    // </StrictMode>
);
