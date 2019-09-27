import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import EmailFormContainer from "containers/Modal/SignupContainer/EmailFormContainer";
import EmailExcludeForm from "./EmailExcludeForm";

const FormContaier = styled.div`
  width: 60%;

  ${props => props.theme.mobileL({ width: "80%" })}
`; // Contaier

function SignupForm({ onSubmit }) {
  const [emailObj, setEmailObj] = useState({
    isEmailAuth: false,
    email: "",
  });

  return (
    <FormContaier>
      <EmailFormContainer
        onSubmit={({ email, isCodeAuth }) => {
          setEmailObj({ email, isEmailAuth: isCodeAuth });
        }}
      />
      <EmailExcludeForm
        onSubmit={onSubmit}
        email={emailObj.email}
        isEmailAuth={emailObj.isEmailAuth}
      />
    </FormContaier>
  );
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
