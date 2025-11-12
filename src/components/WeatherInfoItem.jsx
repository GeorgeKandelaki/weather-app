import styled from "styled-components";

const StyledWeatherInfoItem = styled.div`
    width: 100%;
    background-color: var(--color-neutral-800);
    padding: 1.8rem 2rem;
    border-radius: 1rem;
    border: 1px solid var(--color-neutral-600);

    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Label = styled.p`
    color: var(--color-neutral-300);
    font-weight: 600;
`;

const Value = styled.p`
    font-size: 3rem;
`;

function WeatherInfoItem({ data, isLoading }) {
    return (
        <StyledWeatherInfoItem>
            <Label>{data.label}</Label>
            <Value>{isLoading ? "--" : data.value}</Value>
        </StyledWeatherInfoItem>
    );
}

export default WeatherInfoItem;
