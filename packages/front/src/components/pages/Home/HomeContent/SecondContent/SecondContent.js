import React from "react";
import styled from "styled-components";

import FlexContainer from "components/FlexContainer";
// import MapContent from "./MapContent";
import CreateContent from "./CreateContent";
import FindContent from "./FindContent";

const Container = styled(FlexContainer)`
  max-width: 100%;
  margin-top: 10rem;
  margin-bottom: 10vh;
  background-color: white;
`;

function SecondContent() {
  return (
    <Container direction="row" justify="center" wrap>
      <FindContent />
      {/* <MapContent /> */}
      <CreateContent />
    </Container>
  );
}

export default SecondContent;
