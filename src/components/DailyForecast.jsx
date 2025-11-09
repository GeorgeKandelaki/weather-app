import styled from "styled-components";
import DailyForecastItem from "./DailyForecastItem";

const StyledDailyForecast = styled.div`
    grid-column: 1 / 2;
    grid-row: 2 / 3;
`;

const Heading = styled.p`
    font-weight: 600;
    margin-bottom: 2.4rem;
    font-size: 2rem;
`;

const Forecast = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

function DailyForecast({ days }) {
    return (
        <StyledDailyForecast>
            <Heading>Daily Forecast</Heading>
            <Forecast>
                {days.map((day) => (
                    <DailyForecastItem forecast={day} key={day.day} />
                ))}
            </Forecast>
        </StyledDailyForecast>
    );
}

export default DailyForecast;
