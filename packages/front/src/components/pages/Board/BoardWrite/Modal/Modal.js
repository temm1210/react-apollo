import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "components/Modal";
import FlexContainer from "components/FlexContainer";
import { Text, Form, Loading } from "components/base";

import { ImageForm, TitleForm } from "./Form";

const TextWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const FormContainer = styled.div`
  max-width: 1600px;
  width: 100%;
`;

function BoardWriteModal({
  imgsObj,
  isSubmited,
  titleVal,
  mode,
  imgVal,
  onSubmit,
  onClose,
  loading,
}) {
  return (
    <Modal onClose={onClose} offTop="10vh" width="100%">
      {loading && <Loading />}
      <TextWrapper>
        <Text bold size="1.5rem">
          Board preview
        </Text>
      </TextWrapper>

      <FormContainer>
        <Form>
          <FlexContainer wrap direction="column" align="center">
            <ImageForm
              imgsObj={imgsObj}
              imgVal={imgVal}
              isSubmited={isSubmited}
            />
            <TitleForm
              titleVal={titleVal}
              isSubmited={isSubmited}
              onSubmit={onSubmit}
              mode={mode}
            />
          </FlexContainer>
        </Form>
      </FormContainer>
    </Modal>
  );
}
BoardWriteModal.defaultProps = {
  loading: false,
  mode: "read",
};

BoardWriteModal.propTypes = {
  mode: PropTypes.string,
  loading: PropTypes.bool,
  titleVal: PropTypes.object.isRequired,
  isSubmited: PropTypes.bool.isRequired,
  imgVal: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  imgsObj: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BoardWriteModal;
