import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const LoaderWrapper = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    height: 5rem; // adjust as needed
    color: var(--color-neutral-200);
`;

const Dot = styled.div`
    width: 1.2rem;
    height: 1.2rem;
    background-color: var(--color-neutral-200);
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out;

    &:nth-child(1) {
        animation-delay: 0s;
    }
    &:nth-child(2) {
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        animation-delay: 0.4s;
    }
`;

function Loading() {
    return (
        <LoaderWrapper>
            <div style={{ display: "flex", gap: "10px" }}>
                <Dot />
                <Dot />
                <Dot />
            </div>
            <p>Loading...</p>
        </LoaderWrapper>
    );
}

export default Loading;
