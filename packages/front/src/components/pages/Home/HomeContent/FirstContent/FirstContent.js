import React from "react";
import styled from "styled-components";
import FlexContainer from "components/FlexContainer";
import { Text } from "components/base";

const Container = styled(FlexContainer)`
  padding-top: 2rem;
  padding-bottom: 3rem;
  background-color: #eee;
  ${props => props.theme.tablet({ flexDirection: "column" })};
`; // Container

const TitleWrapper = styled.div`
  padding: 1rem;
  margin: 1rem auto;
  /* margin-bottom: 5rem; */
`; // TitleWrapper

function FirstContent() {
  return (
    <Container direction="column">
      <TitleWrapper>
        <Text bold size="2.6rem">
          소개
        </Text>
      </TitleWrapper>
      <TitleWrapper>
        <Text bold size="1.2rem">
          다양한 분야의 정보를 기록하고 저장할 수 있으며, 다른 유저와 의견을
          공유할 수 있습니다.
        </Text>
      </TitleWrapper>
    </Container>
  );
}

export default FirstContent;
