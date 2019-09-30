import React, { useMemo } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Loading } from "components/base";
import BoardRead from "components/pages/Board/BoardRead";
import GqlTypes, { getBoardQuery, deleteBoardQuery } from "./queries";

const BoardReadContainer = withRouter(({ id, history }) => {
  const idNumber = Number.parseInt(id, 10);
  // 선택한 게시물 가져오기
  const { loading, error, data: getBoardQueryData } = useQuery(
    GqlTypes.GET_BOARD,
    {
      variables: { id: idNumber },
    },
  );

  // 현재 로그인된 유저 닉네임 가져오기
  const { data: getUsernameQueryData } = useQuery(GqlTypes.GET_USERNAME);

  // 삭제버튼을 클릭시 작동하는 쿼리
  const [deleteBoard] = useMutation(GqlTypes.DELETE_BOARD, {
    variables: { id: idNumber },
    onCompleted: deleteBoardQueryData => {
      const isDeleted =
        deleteBoardQueryData && deleteBoardQueryData[deleteBoardQuery];
      if (isDeleted) {
        history.push("/board");
      }
    },
  });

  // board query data 가져오기
  const board = getBoardQueryData && getBoardQueryData[getBoardQuery];

  // 현재 로그인된 username 가져오기
  const current_username =
    getUsernameQueryData &&
    getUsernameQueryData.user &&
    getUsernameQueryData.user.username;

  // 가져온 board데이터는 memorized
  const boardMemo = useMemo(
    () => ({
      content: board && board.content,
      title: board && board.title,
      username: board && board.username,
      create_date: board && board.create_date,
      views: board && board.views,
    }),
    [board],
  );

  // handle click
  const handleDeleteClick = () => {
    if (typeof window !== "undefined" && window.confirm("삭제 하시겠습니까?")) {
      deleteBoard();
    }
  };

  const isSameAutor = current_username === boardMemo.username;

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <BoardRead
      handleDeleteClick={handleDeleteClick}
      id={idNumber}
      isSameAutor={isSameAutor}
      board={boardMemo}
    />
  );
});

BoardReadContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BoardReadContainer;
