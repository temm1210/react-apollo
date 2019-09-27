import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import FlexContainer from "components/FlexContainer";
import { Icon } from "components/base";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  padding: ${props => `${props.offTop} 1rem 1rem 1rem`};
  overflow: scroll;
  /* height: 100%; */
  background-color: rgba(255, 255, 255, 0.95);
  ${props => props.theme.mobileL({ padding: "0" })};
`; // Container

const opacity = keyframes`
  from {opacity:0}
  to {opacity:1}
`;

const ModalContainer = styled(FlexContainer)`
  max-width: ${props => props.width}px;
  min-width: 400px;
  margin: 0 auto;
  padding-bottom: 3rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  animation: ${opacity} 0.5s forwards;

  ${props => props.theme.mobileL({ minWidth: "100%" })};
`; // ModalContainer

const IconWrapper = styled.div`
  margin-left: auto;
  margin-top: 12px;
  color: rgba(0, 0, 0, 0.3);
  padding-right: 12px;
`; // IconWrapper

function ModalPortal({ width, offTop, onClose, children }) {
  const setBodyOverFlow = value => {
    document.body.style.overflow = value;
  };

  useEffect(() => {
    setBodyOverFlow("hidden");
    return () => {
      setBodyOverFlow("auto");
    };
  }, []);
  return (
    <Container offTop={offTop}>
      <ModalContainer width={width} direction="column" align="center">
        <IconWrapper>
          <button type="button" onClick={onClose}>
            <Icon icon="times" iconsize="1rem" />
          </button>
        </IconWrapper>
        {children}
      </ModalContainer>
    </Container>
  );
}

ModalPortal.defaultProps = {
  width: "600",
  offTop: "8vh",
  onClose: null,
};

ModalPortal.propTypes = {
  width: PropTypes.string,
  offTop: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element, PropTypes.node),
  ]).isRequired,
};

export default ModalPortal;
