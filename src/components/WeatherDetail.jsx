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

const StyledWeatherDetail = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 3.2rem;

    margin-top: 3.2rem;
`;

const days = [
    {
        day: "Mon",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
    {
        day: "Tue",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
    {
        day: "Wed",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
    {
        day: "Thu",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
    {
        day: "Fri",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
    {
        day: "Sat",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
    {
        day: "Sun",
        icon: iconRain,
        maxTemp: "20",
        minTemp: "15",
    },
];

const hours = [
    {
        icon: iconSnow,
        hour: "3PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "4PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "5PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "6PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "7PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "8PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "9PM",
        maxTemp: "20",
    },
    {
        icon: iconSnow,
        hour: "10PM",
        maxTemp: "20",
    },
];

function WeatherDetail() {
    return (
        <StyledWeatherDetail>
            <CurrentWeather
                icon={iconSunny}
                temp={20}
                location="Berlin, Germany"
                date="Tuesday, Aug 5, 2025"
                info={[
                    { label: "Feels Like", value: "18°" },
                    { label: "Humidity", value: "46%" },
                    { label: "Wind", value: "14 km/h" },
                    { label: "Precipitation", value: "0 mm" },
                ]}
            />
            <DailyForecast days={days} />
            <HourlyForecast hours={hours} />
        </StyledWeatherDetail>
    );
}

export default WeatherDetail;
