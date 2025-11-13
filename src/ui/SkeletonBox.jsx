import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.direction === "column" ? "column" : "row")};
    gap: 1rem;

    ${(props) =>
        props.direction === "row" &&
        `
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    `}
`;

const SkeletonItem = styled.div`
    height: ${(props) => props.height || "100px"};
    width: ${(props) => props.width || "100%"};
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default function SkeletonBox({
    count = 7,
    height,
    width,
    direction = "row", // "row" for daily, "column" for hourly
    className,
}) {
    return (
        <SkeletonContainer direction={direction} className={className}>
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonItem key={i} height={height} width={width} />
            ))}
        </SkeletonContainer>
    );
}
