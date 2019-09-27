import React, { useEffect, useMemo } from "react";
import lottie from "lottie-web";
import styled from "styled-components";
import Typed from "typed.js";

import FlexContainer from "components/FlexContainer";
import FixedBackImage from "components/FixedBackImage";
import { Text } from "components/base";
import introImg from "asset/images/home/top/intro.jpg";

import welcomeLottie from "asset/lotties/welcome.json";

const TitleContainer = styled(FlexContainer)`
  margin-right: 4rem;

  ${props => props.theme.tablet({ marginRight: 0 })};
`; // TextContainer

const TextWrapper = styled.div`
  margin-top: 20px;
`; // TextWrapper

const TypedContainer = styled(FlexContainer)`
  color: white;
  font-weight: bold;
  font-size: 3rem;
`; // TypedContainer

const TypedWrapper = styled.div`
  margin-left: 20px;
  white-space: pre;
`; // TypedContainer

const LottieContainer = styled.div`
  width: 120px;
  margin-top: -15px;
`; // LottieContainer

function TopHome() {
  const typedStrings = useMemo(() => {
    return ["React", "Quilljs", "Apollo", "GraphQL", "MySql"];
  }, []);

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById(`lottie-test`), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: welcomeLottie,
    });

    const options = {
      strings: typedStrings,
      typeSpeed: 150,
      backSpeed: 60,
      loop: true,
      contentType: "html",
    };
    const typed = new Typed("#typed", options);
    return () => typed.destroy();
  }, []);

  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <FixedBackImage image={introImg}>
        <div>
          <TitleContainer justify="center" wrap>
            <LottieContainer id="lottie-test" />
            <TextWrapper>
              <Text size="3rem" bold color="white">
                Welcome to Portfolio
              </Text>
            </TextWrapper>
          </TitleContainer>
          <TypedContainer justify="center">
            Use
            <TypedWrapper id="typed" />
          </TypedContainer>
          <TextWrapper>
            <Text size="1.2rem" color="rgba(255,255,255,.9)">
              You can find useful info and write that you want to share useful
              info
            </Text>
          </TextWrapper>
        </div>
      </FixedBackImage>
    </div>
  );
}

export default TopHome;
