import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FlexContainer from "components/FlexContainer";
import logoImg from "asset/images/logo/logo.png";

const LogoContainer = styled(FlexContainer)`
  margin-left: 1rem;
`;

const LogoLink = styled(Link).attrs(props => ({
  ...props,
}))`
  font-size: ${props => props.theme.FontSize.large}px;
  font-weight: bold;
  letter-spacing: 1px;
  /* color: ${props => props.theme.FontColor.transBlack}; */
  color: inherit;
`;

const LogoImg = styled.img`
  width: 40px;
`;

const LogoTitle = styled.span`
  /* font-size: 1.8rem; */
  font-weight: bold;
`;

function Logo() {
  return (
    <LogoLink to="/">
      <LogoContainer direction="row">
        <LogoImg src={logoImg} alt="logo" />
        <LogoTitle>Portfolio</LogoTitle>
      </LogoContainer>
    </LogoLink>
  );
}

export default Logo;
