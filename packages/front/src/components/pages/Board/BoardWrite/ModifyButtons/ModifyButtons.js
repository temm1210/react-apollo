import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "components/base";

const ButtonWrapper = styled.div`
  height: 50px;
  width: 100px;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
`;

function BoardModifyButtons({ id, handleOpenModal }) {
  return (
    <Fragment>
      <ButtonWrapper>
        <Button fat onClick={handleOpenModal}>
          수정
        </Button>
      </ButtonWrapper>
      <Link to={`/board/${id}`}>
        <ButtonWrapper>
          <Button fat>취소</Button>
        </ButtonWrapper>
      </Link>
    </Fragment>
  );
}

BoardModifyButtons.propTypes = {
  id: PropTypes.number.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
};

export default BoardModifyButtons;
