import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, Form, Input, Button, Icon } from "components/base";
import { useInput, useForm } from "components/CustomHooks";
import FlexContainer from "components/FlexContainer";

import { passwdValidation, emailValidation } from "../../validation";

const FieldContainer = styled.div`
  margin-bottom: 3rem;
`;

const FieldWrapper = styled.div`
  margin: 22px 0;
`;

const Field = styled(FlexContainer).attrs({
  align: "center",
})`
  width: 100%;
  padding: 3px 0;

  background-color: #eee;
  border-radius: 15px;
`; // InputWrapper

const IconWrapper = styled.div`
  padding: 3px 15px;
`; // InputWrapper

const ModalInput = styled(Input)`
  padding: 10px 0;
  border-radius: inherit;
`; // ModalInput

const ButtonWrapper = styled.div`
  margin-top: 1.8rem;
  margin-bottom: 1.4rem;
  width: 100%;
  /* height: 55px; */
  border-radius: 10px;
  opacity: ${props => (props.isBlock ? ".2" : "1")};
  pointer-events: ${props => (props.isBlock ? "none" : "auto")};
`; // ButtonWrapper

function EmailExcludeForm({ onSubmit }) {
  const emailInput = useInput("", { emailValidation });
  const passwdInput = useInput("", { passwdValidation });

  const isValid =
    !passwdInput.errors.passwdValidation && !emailInput.errors.emailValidation;

  const { isSubmited, handleSubmit } = useForm(isValid, error => {
    if (!error) {
      onSubmit({
        email: emailInput.value,
        password: passwdInput.value,
      });
    }
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FieldContainer>
        <FieldWrapper>
          <Field>
            <IconWrapper>
              <Icon icon="user" iconsize="1.2rem" color="black" />
            </IconWrapper>
            <ModalInput
              autoFocus
              type="text"
              placeholder="이메일 입력"
              value={emailInput.value}
              onChange={emailInput.onChange}
            />
          </Field>
          {(emailInput.errors.isRequired ||
            emailInput.errors.emailValidation) &&
            isSubmited && <Text color="red">올바른 이메일을 입력해주세요</Text>}
        </FieldWrapper>

        <FieldWrapper>
          <Field>
            <IconWrapper>
              <Icon icon="lock" iconsize="1.2rem" color="black" />
            </IconWrapper>
            <ModalInput
              type="password"
              placeholder="비밀번호 입력"
              onChange={passwdInput.onChange}
            />
          </Field>

          {(passwdInput.errors.isRequired ||
            passwdInput.errors.passwdValidation) &&
            isSubmited && (
              <Text color="red">4자이상의 비밀번호를 입력해주세요</Text>
            )}
        </FieldWrapper>
      </FieldContainer>

      <ButtonWrapper>
        <Button fat type="submit">
          <Text color="white" size="18px">
            로그인
          </Text>
        </Button>
      </ButtonWrapper>
    </Form>
  );
}
EmailExcludeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EmailExcludeForm;
