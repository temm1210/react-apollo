import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Editor from "components/Editor";
import FlexContainer from "components/FlexContainer";
import { Button } from "components/base";

import ModifyButtons from "./ModifyButtons";

const ButtonContainer = styled(FlexContainer)`
  margin-top: 4rem;
`;

function BoardWrite({ id, editorVal, handleOpenModal }) {
  return (
    <FlexContainer align="center" direction="column">
      <Editor focus value={editorVal.value} onChange={editorVal.onChange} />
      <ButtonContainer direction="row">
        {id ? (
          <ModifyButtons id={id} handleOpenModal={handleOpenModal} />
        ) : (
          <Button onClick={handleOpenModal}>작성하기</Button>
        )}
      </ButtonContainer>
    </FlexContainer>
  );
}

BoardWrite.defaultProps = {
  id: null,
};

BoardWrite.propTypes = {
  id: PropTypes.number,
  handleOpenModal: PropTypes.func.isRequired,
  editorVal: PropTypes.object.isRequired,
};

export default BoardWrite;
