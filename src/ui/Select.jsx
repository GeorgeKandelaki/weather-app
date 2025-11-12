import { useState } from "react";
import styled from "styled-components";

import iconCheckmark from "../assets/images/icon-checkmark.svg";
import iconArrow from "../assets/images/icon-dropdown.svg";
import { capitalize } from "../utils/utils";

const StyledSelect = styled.div`
    position: relative;

    display: flex;
    justify-content: end;
`;

const OpenButton = styled.button`
    background-color: var(--color-neutral-700);
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 0.7rem;

    display: flex;
    align-items: center;
    gap: 1rem;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }
`;

const Dropdown = styled.div`
    width: 25rem;
    position: absolute;
    top: 6rem;
    z-index: 10;

    background-color: var(--color-neutral-800);
    border-radius: 1.5rem;
    padding: 1.5rem 1.5rem 0 1.5rem;

    & > * {
        margin-bottom: 1.5rem;
    }

    & > *:not(:last-child) {
        ${(props) => (props.border ? "border-bottom: 2px solid var(--color-neutral-600);" : "")}
    }
`;

const DropdownButton = styled.button`
    width: 100%;
    background-color: ${(props) => (props.active ? "var(--color-neutral-700)" : "transparent")};
    border: none;
    border-radius: 1rem;

    padding: ${(props) => (props.active ? "1rem 1.5rem" : "1rem 1.5rem;")};

    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;

    &:hover {
        background-color: var(--color-neutral-700);
    }
`;

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.5rem;

    padding: 0.8rem 0;
`;

const DropdownHeading = styled.p`
    color: var(--color-neutral-300);
    font-size: 1.6rem;
`;

function Select({ label, icon, options }) {
    const [isOpen, setIsOpen] = useState(false);
    const [select, setSelect] = useState(label || "");

    function loopOverOptions(data) {
        const children = [];

        if (data && data.constructor === Object) {
            for (const [category, options] of Object.entries(data)) {
                const capitalizedKey = capitalize(category.replaceAll("_", " "));
                const jsx = [];

                for (let i = 0; i < options.length; i++) {
                    jsx.push(
                        <DropdownButton
                            key={options[i].value}
                            onClick={() => options[i]?.handleClick?.()}
                            active={options[i].active}
                        >
                            <p>{options[i].label}</p>
                            {options[i].active && <img src={iconCheckmark} alt="Icon of an selected unit" />}
                        </DropdownButton>
                    );
                }

                children.push(
                    <DropdownContainer key={capitalizedKey}>
                        <DropdownHeading>{capitalizedKey}</DropdownHeading>
                        {jsx}
                    </DropdownContainer>
                );
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                children.push(
                    <DropdownButton
                        key={data[i].value}
                        onClick={() => {
                            data[i]?.handleClick?.();
                            setSelect(data[i].label);
                            setIsOpen(false);
                        }}
                    >
                        {data[i].label}
                    </DropdownButton>
                );
            }
        }

        return children;
    }

    return (
        <StyledSelect>
            <OpenButton onClick={() => setIsOpen((open) => !open)}>
                {icon && <img src={icon} alt="units icon" />} {select}
                <img src={iconArrow} alt="dropdown icon" />
            </OpenButton>

            {isOpen && <Dropdown border={options.constructor !== Array}>{loopOverOptions(options)}</Dropdown>}
        </StyledSelect>
    );
}

export default Select;

/* 
    DATA BLUEPRINT:
        KEY/HEADING_NAME: {
            KEY: {name, value, active: boolean, onClickHandler: fn},
            KEY: {name, value, active: boolean, onClickHandler: fn},
            ...
        }


    Example:
    temperature: {
        cel: {name:"Celsius", value:"foo", onClick: fn}
    }
*/
