import React from "react";
import { Link } from "react-router-dom";
import { Text } from "components/base";
import FlexContainer from "components/FlexContainer";
import createImage from "asset/images/home/content/create.jpg";
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
        <Image src={createImage} alt="test" />
      </ImageContainer>
      <TextContainer direction="column">
        <TitleWrapper>
          <Title responsive={{ laptop: "1.5rem", tablet: "1.4rem" }}>
            <Link to="/board/write">Write</Link>
          </Title>
        </TitleWrapper>
        <SubTextWrapper>
          <Text
            size="1rem"
            color="rgba(0,0,0,.7)"
            responsive={{ laptop: "0.9rem", tablet: "0.8rem" }}
          >
            유용하거나 노하우 같은 공유하고 싶은 정보가 있다면 글쓰기를 통해
            공유해보세요
          </Text>
        </SubTextWrapper>
      </TextContainer>
    </Container>
  );
}

export default FindContent;
