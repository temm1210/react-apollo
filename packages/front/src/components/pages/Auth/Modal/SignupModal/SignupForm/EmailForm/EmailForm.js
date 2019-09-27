import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Text, Form, Input, Button } from "components/base";
import { useInput } from "components/CustomHooks";
import FlexContainer from "components/FlexContainer";

import { emailValidation, authCodeValidation } from "../../../validation";

const SEND_AUTH_CODE = "메일로 인증코드 보내기";
const AUTH_EMAIL_CODE = "인증하기";
const SUCCESS_AUTH_EMAIL_CODE = "인증완료";

const FieldContainer = styled.div`
  margin-bottom: 3rem;
`; // FieldContainer

const FieldWrapper = styled(FlexContainer).attrs({
  align: "center",
})`
  width: 100%;
  padding: 3px 0;
  background-color: transparent;
  border-radius: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`; // InputWrapper

const ModalInput = styled(Input)`
  padding: 10px 0;
`; // ModalInput

const ButtonWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 1.6rem;
  border-radius: 10px;
  text-align: right;
  opacity: ${props => (props.isBlock ? ".2" : "1")};
  pointer-events: ${props => (props.isBlock ? "none" : "auto")};
`; // ButtonWrapper

function EmailForm({
  onSubmit,
  onSubmitSendAuthKey,
  onSubmitEmailDuplicated,
  onSubmitMatchAuthKey,
}) {
  const emailInput = useInput("", { emailValidation });
  const authCodeInput = useInput("", { authCodeValidation });

  const [btnText, setBtnText] = useState(SEND_AUTH_CODE);
  const [isSubmited, setIsSubmited] = useState({
    isSendAuthCode: false,
    isAuthCode: false,
  });

  const handleClick = useCallback(
    async e => {
      e.preventDefault();
      let isSubmitedstate = isSubmited;
      let btnTextState = btnText;
      switch (btnText) {
        case SEND_AUTH_CODE: {
          isSubmitedstate = { ...isSubmitedstate, isSendAuthCode: true };

          // 올바르게 입력되었으면 이메일중복검사를 실행하고,
          // 중복검사에서 통과되면 다음과정을 거침.
          if (!emailInput.errors.emailValidation) {
            const isDuplicated = await onSubmitEmailDuplicated(
              emailInput.value,
            );
            if (!isDuplicated) {
              btnTextState = AUTH_EMAIL_CODE;
              onSubmitSendAuthKey(emailInput.value);
            } else {
              isSubmitedstate = { ...isSubmitedstate, isSendAuthCode: false };

              if (typeof window !== "undefined")
                window.alert(
                  "이미 등록된 이메일입니다. 다른 이메일을 입력해주세요.",
                );
            }
          }
          break;
        }
        case AUTH_EMAIL_CODE: {
          isSubmitedstate = { ...isSubmitedstate, isAuthCode: true };

          if (!authCodeInput.errors.authCodeValidation) {
            const isMatch = await onSubmitMatchAuthKey(authCodeInput.value);
            if (isMatch) {
              btnTextState = SUCCESS_AUTH_EMAIL_CODE;
              onSubmit({
                email: emailInput.value,
                isCodeAuth: !authCodeInput.errors.authCodeValidation,
              });
            }
            if (typeof window !== "undefined")
              window.alert("인증번호가 일치하지 않습니다. 다시 확인해주세요");
          }
          break;
        }
        case SUCCESS_AUTH_EMAIL_CODE: {
          isSubmitedstate = { isAuthCode: false, isSendAuthCode: false };
          break;
        }
        default:
          throw Error("Invalid expected action");
      }

      setIsSubmited(isSubmitedstate);
      setBtnText(btnTextState);

      return false;
    },
    [emailInput, authCodeInput],
  );

  return (
    <Form>
      <FieldContainer>
        <Text bold>*이메일</Text>

        {/* 이메일 관련 input 시작 */}
        <FieldWrapper>
          <ModalInput
            readOnly={btnText !== SEND_AUTH_CODE || false}
            autoFocus
            type="text"
            placeholder="이메일 입력"
            onChange={emailInput.onChange}
          />
        </FieldWrapper>
        {(emailInput.errors.isRequired || emailInput.errors.emailValidation) &&
          isSubmited.isSendAuthCode && (
            <Text color="red">올바른 이메일을 입력해주세요</Text>
          )}
        {/* 이메일 관련 input 끝 */}

        {/* 인증코드 관련 input 시작 */}
        {btnText === AUTH_EMAIL_CODE && (
          <FieldWrapper>
            <ModalInput
              autoFocus
              type="text"
              placeholder="인증번호입력"
              onChange={authCodeInput.onChange}
            />
          </FieldWrapper>
        )}

        {(authCodeInput.errors.isRequired ||
          authCodeInput.errors.authCodeValidation) &&
          isSubmited.isAuthCode && (
            <Text color="red">올바른 인증번호를 입력해주세요</Text>
          )}
        {/* 인증코드 관련 input 끝 */}

        {/* 버튼 관련 시작 */}
        {btnText === SUCCESS_AUTH_EMAIL_CODE ? (
          <Text color="#22d47b">{SUCCESS_AUTH_EMAIL_CODE}</Text>
        ) : (
          <ButtonWrapper>
            <Button onClick={handleClick}>{btnText}</Button>
          </ButtonWrapper>
        )}
        {/* 버튼 관련 끝 */}
      </FieldContainer>
    </Form>
  );
}

EmailForm.propTypes = {
  onSubmitMatchAuthKey: PropTypes.func.isRequired,
  onSubmitSendAuthKey: PropTypes.func.isRequired,
  onSubmitEmailDuplicated: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EmailForm;
