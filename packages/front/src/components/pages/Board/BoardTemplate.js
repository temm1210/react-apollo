import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Template from "components/pages/Template";

const Container = styled(Template)`
  margin-top: 5rem;
`;
function BoardTemplate({ children }) {
  return (
    <Container firstScroll hasFooter={false}>
      {children}
    </Container>
  );
}

BoardTemplate.propTypes = {
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default BoardTemplate;
