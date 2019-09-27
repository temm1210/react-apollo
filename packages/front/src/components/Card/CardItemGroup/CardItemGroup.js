import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FlexContainer from "components/FlexContainer";

const Container = styled(FlexContainer)`
  padding: 1rem;
  width: 70%;
`; // Container

function CardItemGroup({ children }) {
  return (
    <Container direction="column" align="center">
      {children}
    </Container>
  );
}

CardItemGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default CardItemGroup;
