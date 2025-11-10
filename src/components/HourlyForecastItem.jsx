import styled from "styled-components";

const StyledHourlyForecastItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: var(--color-neutral-700);
    padding: 0.4rem 2rem 0.4rem 1rem;
    border-radius: 1.3rem;
`;

const Icon = styled.div`
    width: 100%;

    & img {
        width: 5rem;
        height: 5rem;
    }
`;
const Hour = styled.p``;
const MaxTemp = styled.p`
    color: var(--color-neutral-200);
    font-size: 2rem;
`;

function HourlyForecastItem({ forecast }) {
    return (
        <StyledHourlyForecastItem>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Icon>
                    <img src={forecast.icon} alt="Image of the weather" />
                </Icon>
                <Hour>{forecast.hour}</Hour>
            </div>
            <MaxTemp>{forecast.maxTemp}</MaxTemp>
        </StyledHourlyForecastItem>
    );
}

export default HourlyForecastItem;
