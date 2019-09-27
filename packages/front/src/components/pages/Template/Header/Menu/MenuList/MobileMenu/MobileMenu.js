import React from "react";
import styled from "styled-components";
import FlexContainer from "components/FlexContainer";

import MobileMenuBar from "./MobileMenuBar";
import MoblieMenuList from "./MobileMenuList";

const MobileMenuContainer = styled(FlexContainer)`
  margin-left: 3vh;
`;

function MobileMenu() {
  return (
    <MobileMenuContainer>
      <MobileMenuBar />
      <MoblieMenuList />
    </MobileMenuContainer>
  );
}

export default MobileMenu;
