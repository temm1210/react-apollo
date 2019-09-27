import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "components/base";
import FlexContainer from "components/FlexContainer";
import BoardList, { BoardListTop } from "../BoardList";
// import BoardAside from "../BoardAside";

const Container = styled(FlexContainer)`
  margin-top: 10rem;
  padding: 0 4rem;

  ${props => props.theme.laptop({ padding: "0" })};
`; // Container

const BoardContainer = styled(FlexContainer)`
  max-width: 900px;
`; // BoardContainer

const ButtonWrapper = styled.div`
  width: 8rem;
  height: 3rem;
  padding: 5rem;
  margin: 0 auto;
  //
`; // ButtonContainer

function BoardHome({ handleClick, data }) {
  return (
    <Container justify="center">
      {/* <BoardAside /> */}
      <BoardContainer direction="column">
        <BoardListTop />
        <BoardList data={data.board} />
        <ButtonWrapper>
          {data.hasMore ? (
            <Button fat type="success" onClick={handleClick}>
              더 보기
            </Button>
          ) : (
            "마지막 글 입니다."
          )}
        </ButtonWrapper>
      </BoardContainer>
      {/* <BoardAside position="right" /> */}
    </Container>
  );
}

BoardHome.defaultProps = {
  data: {},
};

BoardHome.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};

export default BoardHome;
