import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, Form, Input, Button } from "components/base";
import { useInput, useForm } from "components/CustomHooks";
import FlexContainer from "components/FlexContainer";

import { passwdValidation, usernameValidation } from "../../../validation";

const FieldWrapper = styled(FlexContainer).attrs({
  align: "center",
})`
  width: 100%;
  padding: 3px 0;
  background-color: transparent;
  border-radius: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`; // InputWrapper

const FieldContainer = styled.div`
  margin-bottom: 3rem;
`;

const ModalInput = styled(Input)`
  padding: 10px 0;
`; // ModalInput

const ButtonWrapper = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 1.4rem;
  width: 100%;
  height: 55px;
  border-radius: 10px;
  opacity: ${props => (props.isBlock ? ".2" : "1")};
  pointer-events: ${props => (props.isBlock ? "none" : "auto")};
`; // ButtonWrapper

function EmailExcludeForm({ email, isEmailAuth, onSubmit }) {
  const passwdInput = useInput("", { passwdValidation });
  const confirmPasswdInput = useInput("");
  const usernameInput = useInput("", { usernameValidation });

  const isValid =
    !passwdInput.errors.passwdValidation &&
    !usernameInput.errors.usernameValidation &&
    confirmPasswdInput.value === passwdInput.value;

  const { isSubmited, handleSubmit } = useForm(isValid, error => {
    if (!error) {
      onSubmit({
        email,
        password: passwdInput.value,
        username: usernameInput.value,
      });
    }
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Text bold>*비밀번호</Text>
      <FieldContainer>
        <FieldWrapper>
          <ModalInput
            type="password"
            placeholder="비밀번호 입력"
            onChange={passwdInput.onChange}
          />
        </FieldWrapper>
        {(passwdInput.errors.isRequired ||
          passwdInput.errors.passwdValidation) &&
          isSubmited && (
            <Text color="red">4자이상의 비밀번호를 입력해주세요</Text>
          )}

        <FieldWrapper>
          <ModalInput
            type="password"
            placeholder="비밀번호 재입력"
            onChange={confirmPasswdInput.onChange}
          />
        </FieldWrapper>
        {(confirmPasswdInput.errors.isRequired ||
          confirmPasswdInput.errors.passwdValidation ||
          confirmPasswdInput.value !== passwdInput.value) &&
          isSubmited && (
            <Text color="red">위에 입력한 비밀번호와 일치하지 않습니다.</Text>
          )}
      </FieldContainer>

      <FieldContainer>
        <Text bold>*닉네임</Text>
        <FieldWrapper>
          <ModalInput
            type="text"
            placeholder="닉네임 입력"
            onChange={usernameInput.onChange}
          />
        </FieldWrapper>
        {(usernameInput.errors.isRequired ||
          usernameInput.errors.usernameValidation) &&
          isSubmited && (
            <Text color="red">4자이상의 닉네임을 입력해주세요</Text>
          )}
      </FieldContainer>

      <ButtonWrapper isBlock={!isEmailAuth}>
        <Button fat type="submit">
          <Text color="white" size="18px">
            회원가입
          </Text>
        </Button>
      </ButtonWrapper>
    </Form>
  );
}
EmailExcludeForm.defaultProps = {
  isEmailAuth: false,
  email: "",
};

EmailExcludeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string,
  isEmailAuth: PropTypes.bool,
};

export default EmailExcludeForm;
