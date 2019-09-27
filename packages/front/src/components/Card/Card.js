import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexContainer from "components/FlexContainer";
import CardItemGroup, { CardItem } from "./CardItemGroup";
import CardImage from "./CardImage";

const Container = styled(FlexContainer)`
  padding: 5px;
  padding-bottom: 0.8rem;
  margin-bottom: 0.8rem;
`; // Container

function Card({ className, direction, children }) {
  return (
    <Container className={className} direction={direction}>
      {children}
    </Container>
  );
}

Card.defaultProps = {
  direction: "row",
  className: "",
};
Card.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

Card.ItemGroup = CardItemGroup;
Card.Item = CardItem;
Card.Image = CardImage;

export default Card;
