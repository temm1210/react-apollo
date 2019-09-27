import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FlexContainer from "components/FlexContainer";

const Container = styled(FlexContainer)`
  margin: 1.5rem 3rem;
  max-width: 35rem;

  ${props =>
    props.theme.laptopL(
      props.single ? { width: "45rem" } : { width: "20rem" },
    )};
  ${props =>
    props.theme.laptop(props.single ? { width: "40rem" } : { width: "16rem" })};
  ${props =>
    props.theme.tablet({
      width: "20rem",
      textAlign: "center",
      margin: "1rem auto",
    })};
`; // Container

function FluidTextGroup({ children, single }) {
  return (
    <Container single={single} direction="column">
      {children}
    </Container>
  );
}

FluidTextGroup.defaultProps = {
  single: false,
};

FluidTextGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  single: PropTypes.bool,
};

export default FluidTextGroup;
