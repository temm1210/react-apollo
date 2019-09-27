import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: calc(100rem / 3);
  padding: 15px;

  ${props =>
    props.theme.laptopL(
      props.single ? { width: "50rem" } : { width: "calc(100rem / 4)" },
    )};
  ${props =>
    props.theme.laptop(
      props.single ? { width: "45rem" } : { width: "calc(100rem / 5)" },
    )};
  ${props => props.theme.tablet({ width: "100%" })};
`; // Container

const Image = styled.img.attrs(props => ({
  src: props.src,
}))`
  max-height: 30rem;
  max-width: 100%;
`; // Image

/**
 * @brief 두개의 파라미터를 입력받아 Fluid Image를 생성.
 * @param {string} src "이미지 소스를 담고있는 경로?정보?파일"
 * @param {single} shape "Fluid가 몇개의 FLuid아이템을 가지고 있는지에 대한 정보".
 */
function FluidImage({ src, single }) {
  return (
    <Container>
      <Image src={src} single={single} />
    </Container>
  );
}

FluidImage.defaultProps = {
  single: false,
};

FluidImage.propTypes = {
  src: PropTypes.string.isRequired,
  single: PropTypes.bool,
};

export default FluidImage;
