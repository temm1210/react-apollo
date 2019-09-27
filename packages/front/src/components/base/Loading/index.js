import React, { useEffect } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import loadingLottie from "asset/lotties/loading.json";

const LoadingContainer = styled.div`
  height: 100vh;
  top: -25px;
  left: 0;
  right: 0;
  bottom: 0;
  /* padding: 0 18rem; */
  -webkit-transform: translateY(25px);
  -ms-transform: translateY(25px);
  transform: translateY(25px);
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.8);
`;

const LoadingWrapper = styled.div`
  width: 20%;
  height: 100%;
  margin: 0 auto;
  ${props => props.theme.tablet({ width: "40%" })};
  ${props => props.theme.mobileL({ width: "60%" })};
`;

function Loading() {
  const elementId = "loading";
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById(`${elementId}`), // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingLottie,
    });

    return () => lottie.destroy();
  });

  return (
    <LoadingContainer>
      <LoadingWrapper id={elementId} />
    </LoadingContainer>
  );
}

export default Loading;
