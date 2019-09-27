import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import FlexContainer from "components/FlexContainer";
import Header from "./Header";
import Footer from "./Footer";

const Container = styled(FlexContainer)`
  min-height: 100vh;
`;

const Body = styled.section`
  flex: 1;
`;

function Template({ className, firstScroll, hasFooter, children }) {
  return (
    <Container direction="column" justify="unset">
      <Header firstScroll={firstScroll} />
      <Body className={className}>{children}</Body>
      {hasFooter && <Footer />}
    </Container>
  );
}

Template.defaultProps = {
  className: "",
  firstScroll: false,
  hasFooter: true,
};

Template.propTypes = {
  className: PropTypes.string,
  firstScroll: PropTypes.bool,
  hasFooter: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Template;
