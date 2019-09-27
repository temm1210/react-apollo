import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  flex-wrap: ${props => props.wrap};
  max-width: 100%;
`;

/**
 * @brief Container역활을 하는 컴포넌트를 만드는 함수.
 * @param {string} align justify-content속성과 같음
 * @param {string} direction flex-direction 속성과 같음
 */
function Container({ wrap, align, direction, justify, children, ...rest }) {
  // console.log("FlexContainer:", <FlexContainer />);
  return (
    <FlexContainer
      // className={className}
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap ? "wrap" : "nowrap"}
      {...rest}
    >
      {children}
    </FlexContainer>
  );
}

Container.defaultProps = {
  wrap: false,
  align: "",
  direction: "row",
  justify: null,
};

Container.propTypes = {
  wrap: PropTypes.bool,
  align: PropTypes.string,
  direction: PropTypes.string,
  justify: PropTypes.string,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default Container;
