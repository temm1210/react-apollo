/* eslint-disable */
import React, { Children } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Form = styled.form`
  width: 100%;
  height: 100%;
  overflow: hidden;
`; // Form

function FormWrap({ onSubmit, children }) {
  // const findInputElement = useCallback(
  //     (childElements, index) => {
  //       const childElementsArray = Children.toArray(childElements);

  //       if (index > childElementsArray.length - 1) {
  //         return;
  //       }

  //       const child = childElementsArray[index];
  //       const childOfChild = child.props && child.props.children;
  //       const childCount = Children.count(childOfChild);
  //       const type =
  //         typeof child.type === "object" ? child.type.target : child.type;

  //       if (type === "input") {
  //         inputErrors.push(child.props.errors);
  //       }

  //       if (childCount > 0) {
  //         findInputElement(childOfChild, 0);
  //       }

  //       findInputElement(childElements, index + 1);
  //     },
  //     [children]
  //   );
  //   findInputElement(children, 0);
  return (
    <Form autocomplete="off" onSubmit={onSubmit}>
      {children}
    </Form>
  );
}

FormWrap.defaultProps = {
  onSubmit: null,
};

FormWrap.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default FormWrap;
