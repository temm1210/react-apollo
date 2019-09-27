import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Text, Input, Button } from "components/base";

const InputContainer = styled.div`
  width: 60%;
  min-width: 400px;
  max-width: 600px;
  margin: 2px 25px;
  margin-top: 3rem;
`;

const FieldWrapper = styled.div`
  margin: 16px 0;
  border-radius: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ModalInput = styled(Input)`
  padding: 10px 0;
  border-radius: inherit;
`; // ModalInput

const ButtonWrapper = styled.div``;

function TitleForm({ titleVal, mode, isSubmited, onSubmit }) {
  return (
    <InputContainer>
      <FieldWrapper>
        <ModalInput
          autoFocus
          key="asdfa"
          type="text"
          placeholder="Input preview title"
          value={titleVal.value}
          onChange={titleVal.onChange}
        />
      </FieldWrapper>
      {(titleVal.errors.isRequired || titleVal.errors.titleValidation) &&
        isSubmited && <Text color="red">6자이상의 제목을 입력해주세요</Text>}

      <ButtonWrapper>
        <Button fat color="blue" onClick={onSubmit}>
          {mode === "modify" ? "수정하기" : "작성하기"}
        </Button>
      </ButtonWrapper>
    </InputContainer>
  );
}

TitleForm.propTypes = {
  mode: PropTypes.string.isRequired,
  titleVal: PropTypes.object.isRequired,
  isSubmited: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TitleForm;
