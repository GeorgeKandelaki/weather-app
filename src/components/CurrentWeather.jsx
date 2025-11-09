import styled from "styled-components";
import WeatherInfoItem from "./WeatherInfoItem";

import bgToday from "../assets/images/bg-today-large.svg";

const StyledCurrentWeather = styled.div`
    font-family: "DM Sans", sans-serif;

    display: flex;
    flex-direction: column;
    gap: 4.8rem;
`;

const Weather = styled.div`
    padding: 0 2rem;
    background: url(${bgToday});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const WeatherInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1.8rem;
`;

const Location = styled.p`
    font-size: 3rem;
    font-weight: 600;
`;

const Date = styled.p`
    color: var(--color-neutral-200);
`;

const Temperature = styled.p`
    font-family: "DM Sans", sans-serif;
    font-weight: 700;
    font-size: 12rem;
    line-height: 2.5;
`;

const TempContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2.4rem;

    & img {
        width: 15rem;
        height: 15rem;
    }
`;

function CurrentWeather({ temp, location, date, icon, info }) {
    return (
        <StyledCurrentWeather>
            <Weather>
                <div>
                    <Location>{location}</Location>
                    <Date>{date}</Date>
                </div>

                <TempContainer>
                    <img src={icon} alt="Icon of the weather" />
                    <Temperature>{temp}&deg;</Temperature>
                </TempContainer>
            </Weather>

            <WeatherInfo>
                {info.map((el) => (
                    <WeatherInfoItem data={el} key={el.label} />
                ))}
            </WeatherInfo>
        </StyledCurrentWeather>
    );
}

export default CurrentWeather;
