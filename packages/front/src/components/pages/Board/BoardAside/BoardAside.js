import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FlexContainer from "components/FlexContainer";

const Container = styled(FlexContainer)`
  position: fixed;
  top: 50%;
  width: 78rem;

  text-align: ${props => (props.position === "right" ? "right" : "none")};
  left: ${props => (props.position === "right" ? "none" : "50%")};
  transform: ${props =>
    props.position === "right" ? "none" : "translateX(-50%)"};

  ${props => props.theme.laptop({ display: "none" })};
`; // AsideContainer

const TextWrapper = styled.div`
  width: inherit;
  box-sizing: inherit;

  &:last-child {
    margin-bottom: 1rem;
  }
`; // TextWrapper

const Text = styled.span`
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`; // Text

const ListrContainer = styled.div`
  padding: 2rem;
`; // ListrContainer

/**
 * @brief 파라미터(어느 방향에다가 메뉴를 만들지)를 입력받아 사이드 메뉴를 만듬.
 * @param {string} position "left, right"
 */
function BoardAside({ position }) {
  return (
    <Container position={position} direction="column">
      <ListrContainer>
        <TextWrapper>
          <Text>Test</Text>
        </TextWrapper>
        <TextWrapper>
          <Text>Test</Text>
        </TextWrapper>
      </ListrContainer>
    </Container>
  );
}

BoardAside.defaultProps = {
  position: "left",
};

BoardAside.propTypes = {
  position: PropTypes.string,
};

export default BoardAside;
