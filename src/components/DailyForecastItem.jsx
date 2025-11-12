import styled from "styled-components";

const StyledDailyForecastItem = styled.div`
    background-color: var(--color-neutral-800);
    padding: 1.8rem 1.5rem;
    border-radius: 1.5rem;
    text-align: center;

    min-height: 13rem;
    width: 100%;
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

function DailyForecastItem({ forecast, isLoading }) {
    return (
        <StyledDailyForecastItem>
            {isLoading ? (
                ""
            ) : (
                <>
                    <Day>{forecast.day}</Day>
                    <Icon>
                        <img src={forecast.icon} alt="Icon of the weather" />
                    </Icon>
                    <Temperatures>
                        <MaxTemp>{Math.round(forecast.maxTemp)}°</MaxTemp>
                        <MinTemp>{Math.round(forecast.minTemp)}°</MinTemp>
                    </Temperatures>
                </>
            )}
        </StyledDailyForecastItem>
    );
}

export default DailyForecastItem;
