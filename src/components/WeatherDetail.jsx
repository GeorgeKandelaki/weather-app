import styled from "styled-components";
import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";
import CurrentWeather from "./CurrentWeather";

const StyledWeatherDetail = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 3.2rem;
`;

function WeatherDetail() {
    return (
        <StyledWeatherDetail>
            <CurrentWeather />
            <DailyForecast />
            <HourlyForecast />
        </StyledWeatherDetail>
    );
}

export default WeatherDetail;
