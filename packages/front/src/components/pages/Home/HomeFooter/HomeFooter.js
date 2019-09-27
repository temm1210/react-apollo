import React from "react";
import styled from "styled-components";

import FlexContainer from "components/FlexContainer";

import animalsImage from "asset/images/home/footer/animals.jpg";
import bycicleImage from "asset/images/home/footer/bycicle.jpg";
import carImage from "asset/images/home/footer/car.jpg";
import climbImage from "asset/images/home/footer/climb.jpg";
import cocktailImage from "asset/images/home/footer/cocktail.jpg";
import concertImage from "asset/images/home/footer/concert.jpg";
import fashionImage from "asset/images/home/footer/fashion.jpg";
import gameImage from "asset/images/home/footer/game.jpg";
import movieImage from "asset/images/home/footer/movie.jpg";
import musicImage from "asset/images/home/footer/music.jpg";
import skiImage from "asset/images/home/footer/ski.jpg";
import studyImage from "asset/images/home/footer/study.jpg";

const Container = styled(FlexContainer)`
  padding: 15px 40px;
  margin: 5rem 0;
  position: relative;

  /* justify-content: center; */
  ${props => props.theme.tablet({ padding: "0", justifyContent: "center" })}
`;

const CardContainer = styled.div`
  width: calc(25% - 1.75rem);
  margin: 0.875rem;
  position: relative;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.8);

  ${props => props.theme.laptopL({ width: "calc(33% - 1.75rem)" })}
  ${props =>
    props.theme.laptop({
      width: "calc(50% - 1.75rem)",
      margin: "0.3rem",
    })}
  /* ${props => props.theme.tablet({ width: "calc(100% - 1.75rem)" })} */
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  height: 100%;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const Image = styled.img.attrs(props => ({
  src: props.src,
}))`
  width: 100%;
  max-height: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  text-align: center;
  z-index: 2;
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Text = styled.span`
  font-size: 1.3rem;
  color: white;
`;

function HomeFooter() {
  return (
    <Container wrap>
      <CardContainer>
        <ImageWrapper>
          <Image src={animalsImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#동물</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={bycicleImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#스터디</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={carImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#스키/#보드</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={climbImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#여행</Text>
        </TextWrapper>
      </CardContainer>
      <CardContainer>
        <ImageWrapper>
          <Image src={cocktailImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#동물</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={concertImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#스터디</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={fashionImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#스키/#보드</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={gameImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#여행</Text>
        </TextWrapper>
      </CardContainer>
      <CardContainer>
        <ImageWrapper>
          <Image src={movieImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#동물</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={musicImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#스터디</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={skiImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#스키/#보드</Text>
        </TextWrapper>
      </CardContainer>

      <CardContainer>
        <ImageWrapper>
          <Image src={studyImage} />
        </ImageWrapper>
        <TextWrapper>
          <Text>#여행</Text>
        </TextWrapper>
      </CardContainer>
    </Container>
  );
}

export default HomeFooter;
