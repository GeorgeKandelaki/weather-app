import styled from "styled-components";
import HourlyForecastItem from "./HourlyForecastItem";
import Select from "../ui/Select";

const StyledHourlyForecast = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / -1;
    align-self: flex-start;

    background-color: var(--color-neutral-800);
    padding: 1.4rem 2.4rem;
    border-radius: 2rem;
`;

const Heading = styled.p`
    font-weight: 600;
    font-size: 2rem;
`;

const Forecast = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    margin-top: 2.5rem;
`;

const days = [
    {
        label: "Monday",
        value: "monday",
    },
    {
        label: "Tuesday",
        value: "tuesday",
    },
    {
        label: "Wednesday",
        value: "wednesday",
    },
    {
        label: "Thursday",
        value: "thursday",
    },
    {
        label: "Friday",
        value: "friday",
    },
    {
        label: "Saturday",
        value: "saturday",
    },
    {
        label: "Sunday",
        value: "sunday",
    },
];

function HourlyForecast({ hours }) {
    return (
        <StyledHourlyForecast>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Heading>Hourly Forecast</Heading>
                <Select options={days} label="Monday" />
            </div>
            <Forecast>
                {hours.map((hour) => (
                    <HourlyForecastItem forecast={hour} key={hour.hour} />
                ))}
            </Forecast>
        </StyledHourlyForecast>
    );
}

export default HourlyForecast;
