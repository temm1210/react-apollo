import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReadOnlyEditor } from "components/Editor";
import FlexContainer from "components/FlexContainer";
import { makeDate } from "helpers";

import BoardReadButtons from "./Buttons";
import BoardComment from "./BoardComment";
// import BoardAside from "../BoardAside";

const Container = styled(FlexContainer)`
  margin-top: 3.2rem;
  margin-bottom: 3rem;
  ${props => props.theme.laptop({ padding: "0" })};
`; // Container

const EditorContainer = styled(FlexContainer)`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  max-width: 900px;
`; // EditorContainer

const BoardCommentContainer = styled(FlexContainer)`
  padding-top: 2rem;
  background-color: rgba(0, 0, 0, 0.02);
`; // BoardCommentContainer

function BoardRead({ board, isSameAutor, id, handleDeleteClick }) {
  const boardReadContent = useMemo(
    () =>
      `
    <strong class="ql-size-huge">${board.title}</strong>
    
    <span class="ql-size-small">${board.username} 
    <span class="ql-size-small" style="color: rgb(187, 187, 187);">
        ${makeDate(board.create_date)},  ${board.views} read
    </span>
    </span>
    <br /><br /><br /><br /><br />
    ${board.content}
    `,
    [board],
  );

  return (
    <Container justify="center" direction="column">
      {/* <BoardAside /> */}
      <EditorContainer direction="column">
        <ReadOnlyEditor id="read-editor" value={boardReadContent} readOnly />
        {isSameAutor && (
          <BoardReadButtons id={id} handleDeleteClick={handleDeleteClick} />
        )}
      </EditorContainer>
      <BoardCommentContainer>
        <BoardComment />
      </BoardCommentContainer>
      {/* <BoardAside position="right" />  */}
    </Container>
  );
}
BoardRead.defaultProps = {
  board: {},
  isSameAutor: false,
};

BoardRead.propTypes = {
  handleDeleteClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  board: PropTypes.object,
  isSameAutor: PropTypes.bool,
};

export default BoardRead;
