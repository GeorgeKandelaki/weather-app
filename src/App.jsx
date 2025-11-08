import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Header from "./ui/Header";
import WeatherDetail from "./components/WeatherDetail";
import Search from "./ui/Search";
import { UnitsProvider } from "./contexts/UnitsContext";

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
    const [search, setSearch] = useState("");

    return (
        <>
            <GlobalStyles />
            <UnitsProvider>
                <StyledApp>
                    <Header />
                    <SearchContainer>
                        <h1>How's the sky looking today?</h1>
                        <Search value={search} onChange={setSearch} />
                    </SearchContainer>
                    <WeatherDetail />
                </StyledApp>
            </UnitsProvider>
        </>
    );
}

export default App;
