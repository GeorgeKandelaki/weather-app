import styled from "styled-components";
import searchIcon from "../assets/images/icon-search.svg";
import iconLoading from "../assets/images/icon-loading.svg";
import { useState } from "react";

import { isEmpty } from "../utils/utils";
import useOutsideClick from "../hooks/useOutsideClick";
import SearchResultItem from "./SearchResultItem";

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    background-color: var(--color-neutral-800);
    padding: 1.2rem 2rem;
    border-radius: 1rem;

    & input {
        width: 100%;
        background-color: inherit;
        border: none;
        outline: none;
        font-size: 1.6rem;
        color: var(--color-neutral-500);
        line-height: 1;
    }

    & input::placeholder {
        color: var(--color-neutral-300);
    }
`;

const SearchButton = styled.button`
    padding: 0 2.4rem;
    background-color: var(--color-blue-500);
    border: none;
    border-radius: 1rem;
    font-size: 1.8rem;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.5;
    }
`;

const Results = styled.div`
    top: 7rem;
    position: absolute;
    background-color: var(--color-neutral-800);
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

function Search({ value, onChange, onSearch, isSearching, results, onClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick(() => setIsOpen(false));

    return (
        <form
            onSubmit={(e) => {
                onSearch(e);
                setIsOpen(true);
            }}
            style={{ display: "flex", gap: "1.5rem" }}
            ref={ref}
        >
            <div
                style={{
                    position: "relative",
                    width: "50rem",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <StyledSearch>
                    <div>
                        <img src={searchIcon} alt="Image of the magnifying glass" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a place..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </StyledSearch>
                {isEmpty(results) && !isOpen ? (
                    ""
                ) : (
                    <Results>
                        {isSearching && isOpen ? (
                            <p>
                                <img src={iconLoading} alt="loading icon" /> Search in progress
                            </p>
                        ) : (
                            results.map((result) => (
                                <SearchResultItem
                                    result={result}
                                    key={result.id}
                                    onClick={() => onClick?.([result.latitude, result.longitude])}
                                />
                            ))
                        )}
                    </Results>
                )}
            </div>
            <SearchButton>Search</SearchButton>
        </form>
    );
}

export default Search;
