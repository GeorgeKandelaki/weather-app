import styled from "styled-components";
import HourlyForecastItem from "./HourlyForecastItem";
import Select from "../ui/Select";
import { useWeather } from "../contexts/WeatherContext";
import { capitalize } from "../utils/utils";

const StyledHourlyForecast = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    align-self: flex-start;

    background-color: var(--color-neutral-800);
    padding: 1.4rem 2.4rem;
    border-radius: 2rem;

    @media screen and (max-width: 65em) {
        grid-column: 1;
        grid-row: 4 / -1;
    }
`;

const Heading = styled.p`
    font-weight: 600;
    font-size: 2rem;
`;

const Forecast = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;

    margin-top: 2.5rem;
    overflow: auto !important;
    max-height: 60rem;
`;

function HourlyForecast({ hours, isLoading }) {
    const { days } = useWeather();

    return (
        <StyledHourlyForecast>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Heading>Hourly Forecast</Heading>
                <Select options={days} label={isLoading ? "---" : capitalize(hours[0].weekday)} />
            </div>

            <Forecast>
                {isLoading
                    ? Array.from({ length: 24 }).map((_, i) => <HourlyForecastItem key={i} isLoading={isLoading} />)
                    : hours.map((hour) => <HourlyForecastItem forecast={hour} key={hour.id} isLoading={isLoading} />)}
            </Forecast>
        </StyledHourlyForecast>
    );
}

export default HourlyForecast;
