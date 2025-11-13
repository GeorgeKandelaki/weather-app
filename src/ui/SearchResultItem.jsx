import styled from "styled-components";

const StyledItem = styled.button`
    padding: 1rem;
    text-align: left;
    background-color: var(--color-neutral-700);
    border: none;
    border-radius: 1rem;
    border: 1px solid var(--color-neutral-600);
    transition: all 0.3s;
    font-size: 1.8rem;
    color: var(--color-neutral-200);

    &:hover {
        background-color: var(--color-neutral-600);
    }
`;

function SearchResultItem({ result, onClick }) {
    return <StyledItem onClick={() => onClick()}>{result.name}</StyledItem>;
}

export default SearchResultItem;
