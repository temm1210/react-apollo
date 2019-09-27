import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// import { Text } from "components/base";

const Container = styled.div`
  margin-right: auto;
  height: 100%;
  padding: 2px;
`; // Container

/**
 * @brief 두개의 파라미터를 입력받아 텍스트링크를 만듬.
 * @param {string} to 이동할 경로
 * @param {string} rest Text Component에 필요한 속성들
 */

function CardItem({ to, children }) {
  return (
    <Container>{to ? <Link to={to}>{children}</Link> : children}</Container>
  );
}

CardItem.defaultProps = {
  to: "",
};

CardItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};

export default CardItem;
