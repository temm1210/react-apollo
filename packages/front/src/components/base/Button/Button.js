import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const StyledButton = styled.button`
  color: white;
  padding: ${props => (props.fat ? "15px 25px" : "10px 15px")};
  font-family: "Questrial", "Noto Sans", "Noto Sans KR", sans-serif;
  margin-top: 0;
  font-size: 15px;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  background-color: ${props => props.theme.Button[props.color]};

  &:hover {
    opacity: 0.8;
  }
`;

/**
 * @brief  파라미터를 입력받아 버튼을 만듬.
 * @param {fat} bool 버튼의 너비를 정함. true면 좀 뚱뚱한 버튼
 * @param {color} string 버튼의 종류를결정(색깔별로) "green blue red"
 */

function Button({ fat, color, children, ...rest }) {
  return (
    <StyledButton fat={fat} {...rest} color={color}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  fat: false,
  color: "green",
  rest: {},
};

Button.propTypes = {
  fat: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  rest: PropTypes.object,
};

export default Button;
