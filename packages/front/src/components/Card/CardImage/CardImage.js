import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  min-width: 20vh;
  width: 100%;
  padding: 1rem;
  margin: auto;
  flex: 1;
`; // Container

const Img = styled.div`
  background-image: ${props => `url(${props.src})`};

  background-size: cover;
  background-position: 43% 50%;
  background-origin: border-box;
  height: 18vh;

  /* ${props => props.theme.tablet({ height: "100%" })}; */
`;

/**
 * @brief 두개의 파라미터를 입력받아 이미지링크를 만듬.
 * @param {string} to 이동할 경로
 * @param {string} src 이미지 파일
 */
function CardImage({ to, src }) {
  return (
    <Container>
      <Link to={to}>
        <Img src={src} />
      </Link>
    </Container>
  );
}

CardImage.propTypes = {
  to: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default CardImage;
