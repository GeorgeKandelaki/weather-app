import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Header from "./ui/Header";
import WeatherDetail from "./components/WeatherDetail";
import Search from "./ui/Search";
import { UnitsProvider } from "./contexts/UnitsContext";
import { useWeather, WeatherProvider } from "./contexts/WeatherContext";

const StyledApp = styled.div`
    margin: 4.8rem 9.6rem;
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;

    font-size: 2.8rem;
    margin-top: 4rem;
`;

function App() {
    const { search, setSearch } = useWeather();

    return (
        <>
            <GlobalStyles />
            <UnitsProvider>
                <WeatherProvider>
                    <StyledApp>
                        <Header />

                        <SearchContainer>
                            <h1>How's the sky looking today?</h1>
                            <Search value={search} onChange={setSearch} />
                        </SearchContainer>

                        <WeatherDetail />
                    </StyledApp>
                </WeatherProvider>
            </UnitsProvider>
        </>
    );
}

export default App;
