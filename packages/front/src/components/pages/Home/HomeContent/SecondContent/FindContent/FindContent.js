import React from "react";
import { Link } from "react-router-dom";
import { Text } from "components/base";
import FlexContainer from "components/FlexContainer";
import findImage from "asset/images/home/content/find.jpg";
import styled from "styled-components";

const Container = styled(FlexContainer)`
  margin: 2rem;
`;
const ImageContainer = styled.div`
  /* min-width: 350px; */
  max-width: 600px;
`;
const Image = styled.img`
  width: 100%;
`;

const TextContainer = styled(FlexContainer)`
  /* width: 50%; */
  transform: translateY(-3rem);
`;
const TitleWrapper = styled.div`
  width: 50%;
  /* padding: 1rem 2rem; */
  margin: 0 auto;
  text-align: center;
  margin-bottom: 1.5rem;
  background-color: white;
`;

const Title = styled(Text)`
  color: #ff006c;
  font-size: 2.2rem;
  font-weight: bold;

  &:hover {
    color: rgba(255, 0, 108, 0.4);
  }
`;

const SubTextWrapper = styled.div`
  margin-bottom: 1.5rem;
  width: 400px;

  ${props => props.theme.tablet({ width: "100%" })};
`;

function FindContent() {
  return (
    <Container wrap direction="column" align="center">
      <ImageContainer>
        <Image src={findImage} alt="test" />
      </ImageContainer>
      <TextContainer direction="column">
        <TitleWrapper>
          <Title responsive={{ laptop: "1.5rem", tablet: "1.4rem" }}>
            <Link to="/board">Search</Link>
          </Title>
        </TitleWrapper>
        <SubTextWrapper>
          <Text
            size="1rem"
            color="rgba(0,0,0,.7)"
            responsive={{ laptop: "0.9rem", tablet: "0.8rem" }}
          >
            원하는 정보를 검색할 수 있으며 다른사람들과 해당 정보에 대한 여러
            생각을 공유할 수 있습니다. 원하는 정보를 검색해 보세요.
          </Text>
        </SubTextWrapper>
      </TextContainer>
    </Container>
  );
}

export default FindContent;
