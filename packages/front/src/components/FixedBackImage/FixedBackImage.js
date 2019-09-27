import React, { Children, cloneElement } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  background-image: url(${props => props.image});
  background-attachment: fixed;
  height: 100vh;
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
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`; // ImageContainer

/**
 * @brief  파라미터를 입력받아 background image를 만듬.
 * @param {image} bool image 파일경로
 * @param {top} string background image를 배경으로 가지는 컨텐츠가 시작될 위치(상단으로부터 떨어진 거리)
 */

function FixedBackImage({ image, top, children }) {
  const newChildElement = cloneElement(Children.only(children), {
    style: {
      position: "absolute",
      left: "0",
      top,
      right: "0",
      bottom: "0",
      zIndex: "3",
      textAlign: "center",
    },
  });

  return <ImageContainer image={image}>{newChildElement}</ImageContainer>;
}

FixedBackImage.defaultProps = {
  top: "35vh",
};

FixedBackImage.propTypes = {
  image: PropTypes.string.isRequired,
  top: PropTypes.string,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default FixedBackImage;
