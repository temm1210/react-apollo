import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from "components/base/Text";
import { Context, types } from "components/Context";

import LoginForm from "./LoginForm";
import AuthModal from "../AuthModal";

const FormContaier = styled.div`
  width: 60%;

  ${props => props.theme.mobileL({ width: "80%" })}
`; // Contaier

const WarningText = styled(Text)`
  color: red;
`; // WarningText

function LoginModal({ loading, isWarning, onClose, onSubmit }) {
  const { dispatch } = useContext(Context);

  const handleClick = () => {
    dispatch({ type: types.OPEN_SIGNUP_MODAL });
  };

  return (
    <AuthModal
      offTop="20vh"
      onClose={onClose}
      strongClick={handleClick}
      loading={loading}
      text="회원이 아니신가요? "
      strongText="회원가입"
      title="로그인"
    >
      <FormContaier>
        {isWarning ? (
          <WarningText>it is invalid login info. try again</WarningText>
        ) : null}
        <LoginForm onSubmit={onSubmit} />
      </FormContaier>
    </AuthModal>
  );
}

LoginModal.defaultProps = {
  loading: false,
  isWarning: false,
};

LoginModal.propTypes = {
  loading: PropTypes.bool,
  isWarning: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginModal;
