import styled from "styled-components";
import Select from "./Select";
import logo from "../assets/images/logo.svg";
import iconUnits from "../assets/images/icon-units.svg";

import { useUnits } from "../contexts/UnitsContext";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

function Header() {
    const { options } = useUnits();

    return (
        <StyledHeader>
            <div>
                <img src={logo} alt="Logo the website" />
            </div>

            <Select label="Units" icon={iconUnits} options={options} />
        </StyledHeader>
    );
}

export default Header;
