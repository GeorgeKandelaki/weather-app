import { useState } from "react";
import styled from "styled-components";

import iconCheckmark from "../assets/images/icon-checkmark.svg";
import iconArrow from "../assets/images/icon-dropdown.svg";

const StyledSelect = styled.div`
    position: relative;
`;
const OpenButton = styled.button`
    background-color: var(--color-neutral-800);
    padding: 1.5rem 2rem;
    border: none;
    border-radius: 0.7rem;

    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 5rem;
    right: 5rem;
    z-index: 10;

    padding: 1.2rem;
`;

const DropdownButton = styled.button``;

const DropdownContainer = styled.div``;

const DropdownHeading = styled.p``;

function capitalize(str) {
    return str
        .trim()
        .split(/\s+/)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function Select({ label, icon, options }) {
    const [isOpen, setIsOpen] = useState(false);

    function loopOverOptions(data) {
        const children = [];

        if (data && data.constructor === Object) {
            for (const [category, options] of Object.entries(data)) {
                const capitalizedKey = capitalize(category.replaceAll("_", " "));
                const jsx = [];

                for (let i = 0; i < options.length; i++) {
                    jsx.push(
                        <DropdownButton key={options[i].value} onClick={() => options[i].handleClick}>
                            {options[i].label}
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
                children.push(<DropdownButton key={data[i].value}>{data[i].label}</DropdownButton>);
            }
        }

        return children;
    }

    return (
        <StyledSelect>
            <OpenButton onClick={() => setIsOpen((open) => !open)}>
                {icon && <img src={icon} alt="units icon" />} {label} <img src={iconArrow} alt="dropdown icon" />
            </OpenButton>

            {isOpen && <Dropdown>{loopOverOptions(options)}</Dropdown>}
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
