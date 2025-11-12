import styled from "styled-components";
import searchIcon from "../assets/images/icon-search.svg";

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    background-color: var(--color-neutral-800);
    padding: 1.2rem 2rem;
    border-radius: 1rem;
    width: 50rem;

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

const Results = styled.div``;

function Search({ value, onChange }) {
    return (
        <div style={{ display: "flex", gap: "1.5rem" }}>
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
            <SearchButton>Search</SearchButton>
        </div>
    );
}

export default Search;
