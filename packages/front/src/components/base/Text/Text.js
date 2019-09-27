import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const NormalText = styled.span`
  font-size: ${props => props.size};
  color: ${props => props.color};
  opacity: ${props => props.opacity};
  font-weight: ${props => (props.bold ? "bold" : "unset")};

  ${props =>
    props.theme.laptop({
      fontSize: (props.responsive && props.responsive.laptop) || props.size,
    })}
  ${props =>
    props.theme.tablet({
      fontSize: (props.responsive && props.responsive.tablet) || props.size,
    })}

  ${props => (props.link ? "&:hover {color: rgba(0, 0, 0, 0.5)" : null)};
`; // Text

/**
 * @brief  파라미터를 입력받아 버튼을 만듬.
 * @param {size} string 텍스트의 크기값
 * @param {color} shape 텍스트의 색깔
 * @param {opacity} string 텍스트의 opacity.
 * @param {bold} string 텍스트의 bold 유무
 */

function Text({ size, responsive, color, opacity, bold, children, ...rest }) {
  return (
    <NormalText
      opacity={opacity}
      bold={bold}
      size={size}
      responsive={responsive}
      color={color}
      {...rest}
    >
      {children}
    </NormalText>
  );
}

Text.defaultProps = {
  className: "",
  size: "14px",
  responsive: null,
  color: "black",
  opacity: "1",
  bold: false,
};

Text.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  responsive: PropTypes.object,
  color: PropTypes.string,
  opacity: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default Text;
