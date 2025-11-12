import styled from "styled-components";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";

import iconSunny from "../assets/images/icon-sunny.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import { useWeather } from "../contexts/WeatherContext";
import { formatDate } from "../utils/utils";

const StyledWeatherDetail = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 3.2rem;

    margin-top: 3.2rem;
`;

function WeatherDetail() {
    const { currentWeather, isLoading, dailyForecastObj, day, hourlyForecastObj, unitsObjAPI } = useWeather();
    const info = [
        { label: "Feels Like", value: `${currentWeather.apparent_temperature}°` },
        { label: "Humidity", value: `${currentWeather.relative_humidity_2m}%` },
        { label: "Wind", value: `${currentWeather.wind_speed_10m} ${unitsObjAPI.wind_speed_unit}` },
        { label: "Precipitation", value: `${currentWeather.precipitation} ${unitsObjAPI.precipitation_unit}` },
    ];

    if (isLoading) return null;

    return (
        <StyledWeatherDetail>
            <CurrentWeather
                icon={currentWeather.icon}
                temp={currentWeather.temperature_2m}
                location={currentWeather.city}
                date={formatDate(currentWeather.time)}
                info={info}
                isLoading={isLoading}
            />
            <DailyForecast days={dailyForecastObj} isLoading={isLoading} />
            <HourlyForecast hours={hourlyForecastObj[day]} isLoading={isLoading} />
        </StyledWeatherDetail>
    );
}

export default WeatherDetail;
