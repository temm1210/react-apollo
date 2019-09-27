// /* eslint-disable */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context, types } from "components/Context";
import AuthModal from "../AuthModal";
import SignupForm from "./SignupForm";

function SignUpModal({ loading, onClose, onSubmit }) {
  const { dispatch } = useContext(Context);

  const handleClick = () => {
    dispatch({ type: types.OPEN_LOG_MODAL });
  };

  return (
    <AuthModal
      onClose={onClose}
      strongClick={handleClick}
      loading={loading}
      offTop="10vh"
      text="이미 회원이신가요? "
      strongText="로그인"
      title="회원가입"
    >
      <SignupForm onSubmit={onSubmit} />
    </AuthModal>
  );
}

SignUpModal.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default SignUpModal;
