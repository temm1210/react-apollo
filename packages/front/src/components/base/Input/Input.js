import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FormInput = styled.input.attrs({ spellCheck: "false" })`
  width: 100%;
  font-size: ${props => props.size};
  font-family: "Poppins", "Noto Sans", "Noto Sans KR", sans-serif;
  color: rgba(0, 0, 0, 0.7);
  background-color: inherit;
  border: none;
  /* border-bottom: 1.2px solid rgba(0, 0, 0, 0.15); */
  ::placeholder {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.25);
  }

  &:-internal-autofill-selected {
    background-color: transparent !important;
  }
`; // Input

function Input({ size, color, onChange, ...rest }) {
  return (
    <FormInput autoComplete="off" size={size} onChange={onChange} {...rest} />
  );
}

Input.defaultProps = {
  color: "rgba(0,0,0,.7)",
  size: "16px",
};

Input.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
