import React, { Children, cloneElement } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexContainer from "components/FlexContainer";
import FluidImage from "./FluidImage";
import FluidTextGroup, { FluidItem } from "./FluidTextGroup";

const Container = styled(FlexContainer)`
  padding: 5rem 1rem;
`;

function Fluid({ direction, children }) {
  const childCount = Children.count(children);
  const childs = Children.toArray(children);
  const single = childCount === 1 || false;

  // Fluid 안에 엘리먼트가 하나라면 전체 row를 사용
  const element = Children.map(childs, child => {
    return cloneElement(child, {
      single,
    });
  });

  return (
    <Container align="center" wrap direction={direction}>
      {element}
    </Container>
  );
}

Fluid.defaultProps = {
  direction: "row",
};

Fluid.propTypes = {
  direction: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

Fluid.Image = FluidImage;
Fluid.TextGroup = FluidTextGroup;
Fluid.Item = FluidItem;

export default Fluid;
