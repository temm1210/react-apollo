import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import FlexContainer from "components/FlexContainer";
import { Button } from "components/base";

const BtnContainer = styled(FlexContainer)`
  margin: 1.5rem auto;
`; // EditorBtnContainer

const BtnWrapper = styled.div`
  border-radius: 0.5rem;
  margin-right: 0.5rem;

  &:last-child {
    margin-left: 0.5rem;
  }
`; // BtnWrapper

function BoardReadButtons({ id, handleDeleteClick }) {
  return (
    <BtnContainer>
      <Link to={`/board/modify/${id}`}>
        <BtnWrapper>
          <Button fat>수정하기</Button>
        </BtnWrapper>
      </Link>
      <BtnWrapper>
        <Button fat onClick={handleDeleteClick}>
          삭제하기
        </Button>
      </BtnWrapper>
    </BtnContainer>
  );
}

BoardReadButtons.propTypes = {
  handleDeleteClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default BoardReadButtons;
