import React from "react";
import styled from "styled-components";
import mapImage from "asset/images/home/content/map.jpg";
import FlexContainer from "components/FlexContainer";

const textWidth = 700;

const Container = styled(FlexContainer)`
  width: 100%;
  background-color: white;
  padding: 6rem 0;
`;

const FixedImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  background-image: url(${mapImage});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &::before {
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

const TextContainer = styled(FlexContainer)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;

  ${props => props.theme.tablet({ textAlign: "center" })};
`;

const TitleText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 1.2rem;
  color: white;
  ${props => props.theme.laptopL({ fontSize: `28px` })};
  ${props => props.theme.laptop({ fontSize: `22px` })};
`;

const SubText = styled.div`
  width: ${textWidth}px;
  font-size: ${props => props.theme.FontSize.small}px;
  color: white;

  ${props => props.theme.tablet({ width: `${textWidth - 300}px` })}
`;

function MapContent() {
  return (
    <Container direction="column" wrap align="center">
      <FixedImageContainer>
        <TextContainer direction="column" align="center" justify="center">
          <TitleText>지도에서 편하게 검색해보세요</TitleText>
          <SubText>
            검색창에 입력만 하세요. 장소, 주소, 버스번호, 정류장 등 원하는
            결과를 한 번에 확인할 수 있습니다
          </SubText>
        </TextContainer>
      </FixedImageContainer>
    </Container>
  );
}

export default MapContent;
