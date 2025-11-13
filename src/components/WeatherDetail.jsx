import styled from "styled-components";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";

import { useWeather } from "../contexts/WeatherContext";
import { formatDate } from "../utils/utils";

const StyledWeatherDetail = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 3.2rem;

    margin-top: 3.2rem;

    @media screen and (max-width: 65em) {
        grid-template-columns: 1fr;
        justify-content: center;
        justify-items: center;
        align-items: center;
        gap: 0.5rem;
    }
`;

function WeatherDetail() {
    const { currentWeather, isLoading, dailyForecastObj, day, hourlyForecastObj, unitsObjAPI } = useWeather();

    const info = [
        { label: "Feels Like", value: `${currentWeather?.apparent_temperature}°` },
        { label: "Humidity", value: `${currentWeather?.relative_humidity_2m}%` },
        { label: "Wind", value: `${currentWeather?.wind_speed_10m} ${unitsObjAPI?.wind_speed_unit}` },
        { label: "Precipitation", value: `${currentWeather?.precipitation} ${unitsObjAPI?.precipitation_unit}` },
    ];

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
            <HourlyForecast hours={hourlyForecastObj?.[day]} isLoading={isLoading} />
        </StyledWeatherDetail>
    );
}

export default WeatherDetail;
