import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Header from "./ui/Header";
import WeatherDetail from "./components/WeatherDetail";
import Search from "./ui/Search";
import { useWeather } from "./contexts/WeatherContext";

const StyledApp = styled.div`
    margin: 4.8rem 9.6rem;

    @media screen and (max-width: 60em) {
        margin: 2rem 4rem;
    }
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
    const { search, setSearch, searchForAPlace, error, setLocation, searchResults, isSearching } = useWeather();

    function handleSearch(e) {
        e.preventDefault();

        searchForAPlace(search);
    }

    return (
        <>
            <GlobalStyles />
            <StyledApp>
                <Header />
                <SearchContainer>
                    <h1 style={{ textAlign: "center" }}>How's the sky looking today?</h1>
                    <Search
                        value={search}
                        onChange={setSearch}
                        onSearch={handleSearch}
                        isSearching={isSearching}
                        results={searchResults}
                        onClick={setLocation}
                    />
                </SearchContainer>

                <WeatherDetail />
            </StyledApp>
        </>
    );
}

export default App;
