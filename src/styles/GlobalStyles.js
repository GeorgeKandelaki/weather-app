import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --color-neutral-900: hsl(243, 96%, 9%);
        --color-neutral-800: hsl(243, 27%, 20%);
        --color-neutral-700: hsl(243, 23%, 24%);
        --color-neutral-600: hsl(243, 23%, 30%);
        --color-neutral-300: hsl(240, 6%, 70%);
        --color-neutral-200: hsl(250, 6%, 84%);
        --color-neutral-0:hsl(0, 0%, 100%);

        --color-orange500: hsl(28, 100%, 52%);


        --color-blue-500: hsl(233, 67%, 56%);
        --color-blue-700: hsl(248, 70%, 36%);
    }

    *, *::before, *::after{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }

    html{
        font-size: 62.5%;
    }

    body{
        // Weights: 300, 500, 600, 600i, 700
        font-size: 1.8rem;
        font-family: "Bricolage Grotesque", sans-serif;
        min-height: 100vh;
        background-color: var(--color-neutral-900);
        color: var(--color-neutral-0);

    }

    input,
    button,
    textarea,
    select {
        font: inherit;
        color: inherit;
        font-size: inherit;
    }

    button {
        cursor: pointer;
    }

    *:disabled {
        cursor: not-allowed;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        overflow-wrap: break-word;
        hyphens: auto;
    }

    img {
        max-width: 100%;
    }

    @media screen and (max-width: 75em){
        html{
            font-size: 50%;
        }
    }
`;

export default GlobalStyles;
