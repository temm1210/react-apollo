import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, Loading } from "components/base";
import Modal from "components/Modal";

const TitleWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`; // TextWrapper

const StrongWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`; // TextWrapper

const Strong = styled.a`
  font-weight: bold;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`; // Strong

function AuthModal({
  offTop,
  loading,
  width,
  text,
  strongText,
  strongClick,
  title,
  onClose,
  children,
}) {
  return (
    <Modal offTop={offTop} width={width} onClose={onClose}>
      <TitleWrapper>
        <Text size="1.8rem" bold>
          {title}
        </Text>
      </TitleWrapper>
      {children}
      <StrongWrapper>
        <Text>
          {text}
          <Strong onClick={strongClick}>{strongText}</Strong>
        </Text>
      </StrongWrapper>
      {loading && <Loading />}
    </Modal>
  );
}
AuthModal.defaultProps = {
  //   fields: [],
  offTop: undefined,
  width: undefined,
  children: null,
};

AuthModal.propTypes = {
  offTop: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  width: PropTypes.string,
  strongClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  strongText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    // HTML Tag체크
    PropTypes.node,
    // React Compoent체크
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element, PropTypes.node),
  ]),
};

export default AuthModal;
