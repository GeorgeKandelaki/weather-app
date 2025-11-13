import styled, { keyframes, css } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const StyledDailyForecastItem = styled.div`
    background-color: var(--color-neutral-800);
    padding: 1.8rem 1.5rem;
    border-radius: 1.5rem;
    text-align: center;
    min-height: 13rem;
    width: 100%;
`;

const skeletonStyle = css`
    background: linear-gradient(
        90deg,
        var(--color-neutral-700) 25%,
        var(--color-neutral-600) 50%,
        var(--color-neutral-700) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
    border-radius: 0.5rem;
`;

const Day = styled.p``;

const Icon = styled.div`
    img {
        width: 40px;
        height: 40px;
    }
`;

const Temperatures = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Temp = styled.p`
    &.min {
        color: var(--color-neutral-300);
    }
`;

const SkeletonBox = styled.div`
    ${skeletonStyle}
    height: ${({ height }) => height || "1rem"};
    width: ${({ width }) => width || "100%"};
    margin: ${({ margin }) => margin || "0 auto"};
`;

function DailyForecastItem({ forecast, isLoading }) {
    if (isLoading) {
        return (
            <StyledDailyForecastItem>
                <SkeletonBox height="1.2rem" width="50%" margin="0 auto 1rem" />
                <SkeletonBox height="3.5rem" width="3.5rem" margin="0 auto 1rem" />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <SkeletonBox height="1rem" width="40%" />
                    <SkeletonBox height="1rem" width="40%" />
                </div>
            </StyledDailyForecastItem>
        );
    }

    return (
        <StyledDailyForecastItem>
            <Day>{forecast.day}</Day>
            <Icon>
                <img src={forecast.icon} alt="Weather icon" />
            </Icon>
            <Temperatures>
                <Temp>{Math.round(forecast.maxTemp)}°</Temp>
                <Temp className="min">{Math.round(forecast.minTemp)}°</Temp>
            </Temperatures>
        </StyledDailyForecastItem>
    );
}

export default DailyForecastItem;
