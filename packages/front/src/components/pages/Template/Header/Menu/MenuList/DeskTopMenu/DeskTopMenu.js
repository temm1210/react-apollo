import React from "react";
import styled from "styled-components";

import FlexContainer from "components/FlexContainer";
import MenuList from "containers/MenuListContainer";

const MenuLinkContainer = styled(FlexContainer)`
  margin-left: 20vw;
  font-size: ${props => props.theme.FontSize.small}px;
  color: inherit;
  ${props => props.theme.tablet({ display: "none" })};
`;

function DeskTopMenu() {
  return (
    <MenuLinkContainer>
      <MenuList />
    </MenuLinkContainer>
  );
}

export default DeskTopMenu;
