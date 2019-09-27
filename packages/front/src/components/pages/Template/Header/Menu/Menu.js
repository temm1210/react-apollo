import React, { useContext } from "react";
import styled from "styled-components";
import { Context, types } from "components/Context";
import FlexContainer from "components/FlexContainer";
import { LoginContainer, SignupContainer } from "containers/Modal";
import { DeskTopMenu, MobileMenu } from "./MenuList";
import LogoMenu from "./LogoMenu";


const MenuContainer = styled(FlexContainer)`
  margin: auto;
`;

function Menu() {
  const { state, dispatch } = useContext(Context);

  const handleClose = () => {
    dispatch({ type: types.CLOSE_MODAL });
  };

  return (
    <MenuContainer id="menu">
      <LogoMenu />
      <DeskTopMenu />
      <MobileMenu />

      {state.isClickLogin && <LoginContainer onClose={handleClose} />}
      {state.isClickSignUp && <SignupContainer onClose={handleClose} />}
    </MenuContainer>
  );
}

export default Menu;
