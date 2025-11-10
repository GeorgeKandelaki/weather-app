import styled from "styled-components";

const StyledDailyForecastItem = styled.div`
    background-color: var(--color-neutral-800);
    padding: 1.8rem 1.5rem;
    border-radius: 1.5rem;
    text-align: center;
`;
const Day = styled.p``;
const Icon = styled.div``;
const Temperatures = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const MinTemp = styled.p`
    color: var(--color-neutral-300);
`;
const MaxTemp = styled.p``;

function DailyForecastItem({ forecast }) {
    return (
        <StyledDailyForecastItem>
            <Day>{forecast.day}</Day>
            <Icon>
                <img src={forecast.icon} alt="Icon of the weather" />
            </Icon>
            <Temperatures>
                <MaxTemp>{forecast.maxTemp}</MaxTemp>
                <MinTemp>{forecast.minTemp}</MinTemp>
            </Temperatures>
        </StyledDailyForecastItem>
    );
}

export default DailyForecastItem;
