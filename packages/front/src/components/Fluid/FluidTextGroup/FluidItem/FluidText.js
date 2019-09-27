import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  margin-bottom: 2rem;
`; // Container

const Text = styled.div`
  font-size: ${props => props.theme.FontSize[props.size]}px;
  font-weight: ${props => (props.bold ? "bold" : "0")};
  ${props =>
    props.theme.laptop({
      fontSize: `${props.theme.FontSize[props.size] - 2}px`,
    })};
`; // Text

/**
 * @brief 두개의 파라미터를 입력받아 일반 텍스트 만듬.
 * @param {string} size 텍스트 크기
 * @param {bool} bold 텍스트 굵기 유무
 */
function FluidText({ size, bold, children }) {
  return (
    <Container>
      <Text size={size} bold={bold}>
        {children}
      </Text>
    </Container>
  );
}

FluidText.defaultProps = {
  bold: false,
  size: "small",
};

FluidText.propTypes = {
  size: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default FluidText;
