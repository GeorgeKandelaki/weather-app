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
    width: 50rem;

    @media screen and (max-width: 60em) {
        width: calc(100% - 5rem);
    }

    & input {
        width: 50rem;
        background-color: inherit;
        border: none;
        outline: none;
        font-size: 1.6rem;
        color: var(--color-neutral-500);
        line-height: 1;

        @media screen and (max-width: 60em) {
            width: calc(100% - 5rem);
        }
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
    width: 100%;

    &:hover {
        opacity: 0.5;
    }

    @media screen and (max-width: 60em) {
        padding: 1.2rem 2.4rem;
        width: calc(100% - 5rem);
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

const Form = styled.form`
    @media screen and (max-width: 60em) {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

function Search({ value, onChange, onSearch, isSearching, results, onClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useOutsideClick(() => setIsOpen(false));

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                width: "50rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
            }}
        >
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearch(e);
                    setIsOpen(true);
                }}
                style={{ display: "flex", gap: "1.5rem" }}
            >
                <StyledSearch>
                    <div>
                        <img src={searchIcon} alt="magnifying glass" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a place..."
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </StyledSearch>
                <SearchButton>Search</SearchButton>
            </Form>

            {isOpen && (
                <Results>
                    {isSearching ? (
                        <p style={{ textAlign: "center" }}>
                            <img src={iconLoading} alt="loading icon" /> Search in progress
                        </p>
                    ) : isEmpty(results) ? (
                        <p style={{ textAlign: "center" }}>No results :(</p>
                    ) : (
                        results.map((result) => (
                            <SearchResultItem
                                result={result}
                                key={result.id}
                                onClick={() => {
                                    onClick?.([result.latitude, result.longitude]);
                                    setIsOpen(false);
                                    localStorage.setItem(
                                        "location",
                                        JSON.stringify([result.latitude, result.longitude])
                                    );
                                }}
                            />
                        ))
                    )}
                </Results>
            )}
        </div>
    );
}

export default Search;
