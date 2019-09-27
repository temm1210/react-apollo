import React from "react";
import styled from "styled-components";

import FlexContainer from "components/FlexContainer";
import { FooterContent, FooterCopyRight, FooterLogo } from "./FooterList";

const Container = styled(FlexContainer)`
  background-color: #eee;
  padding: 1rem 5%;
  color: white;
`;

function Footer() {
  return (
    <Container direction="column">
      <FooterLogo />
      <FooterContent />
      <FooterCopyRight />
    </Container>
  );
}

export default Footer;
