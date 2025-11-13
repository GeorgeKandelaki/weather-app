import styled from "styled-components";
import WeatherInfoItem from "./WeatherInfoItem";

import bgToday from "../assets/images/bg-today-large.svg";
import Loading from "../ui/Loading";

const StyledCurrentWeather = styled.div`
    font-family: "DM Sans", sans-serif;

    display: flex;
    flex-direction: column;
    gap: 4.8rem;
`;

const Weather = styled.div`
    padding: 0 2rem;
    background-color: var(--color-neutral-700) !important;
    border-radius: 2rem;
    min-height: 30rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 65em) {
        padding: 4rem;
        flex-direction: column;
        align-items: center;
    }
`;

const WeatherInfo = styled.div`
    display: flex;
    /* align-items: center; */
    gap: 1.8rem;

    @media screen and (max-width: 65em) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
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

    @media screen and (max-width: 65em) {
        font-size: 6rem;
    }
`;

const TempContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2.4rem;

    & img {
        width: 15rem;
        height: 15rem;

        @media screen and (max-width: 65em) {
            width: 10rem;
            height: 10rem;
        }
    }

    @media screen and (max-width: 65em) {
        gap: 1.2rem;
    }
`;

const Row = styled.div`
    @media screen and (max-width: 65em) {
        text-align: center;
    }
`;

function CurrentWeather({ temp, location, date, icon, info, isLoading }) {
    return (
        <StyledCurrentWeather>
            <Weather
                style={
                    isLoading
                        ? { justifyContent: "center" }
                        : {
                              background: `url(${bgToday})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                          }
                }
            >
                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <Row>
                            <Location>{location.replace("_", " ")}</Location>
                            <Date>{date}</Date>
                        </Row>

                        <TempContainer>
                            <img src={icon} alt="Icon of the weather" />
                            <Temperature>{Math.round(temp)}&deg;</Temperature>
                        </TempContainer>
                    </>
                )}
            </Weather>

            <WeatherInfo>
                {info.map((el) => (
                    <WeatherInfoItem data={el} key={el.label} isLoading={isLoading} />
                ))}
            </WeatherInfo>
        </StyledCurrentWeather>
    );
}

export default CurrentWeather;
