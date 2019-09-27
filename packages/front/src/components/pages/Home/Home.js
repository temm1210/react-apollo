import React from "react";
import styled from "styled-components";

import HomeTop from "./HomeTop";
import HomeContent from "./HomeContent";
// import HomeFooter from "./HomeFooter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

function Home() {
  return (
    <Container>
      <HomeTop />
      <HomeContent />
      {/* <HomeFooter /> */}
    </Container>
  );
}

export default Home;
