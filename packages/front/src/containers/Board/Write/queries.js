import gql from "graphql-tag";
import schemaName from "back/src/apollo/board/schemaName";

export const insertBoard = schemaName.mutation.INSERT_BOARD;
export const getBoardQuery = schemaName.query.GET_BOARD;
export const updateBoardQuery = schemaName.mutation.UPDATE_BOARD;

// 현재 로그인된 유저의 정보를 가져옴(apollo cache)
const USER = gql`
  query USER {
    user @client {
      username
    }
  }
`;

// 입력한 게시물 작성.
const INSERT_BOARD_MUTATION = gql`
  mutation INSERT_BOARD_MUTATION($board: BoardInput!) {
    ${insertBoard}(board:$board)
  }
`;

// 선택한 게시물 가져오는 쿼리
const GET_BOARD = gql`
    query GET_BOARD($id: Int!) {
        ${getBoardQuery}(id:$id) {
            id
            title
            content
        }
    }
`;

// 게시물 업데이트
const UPDATE_BOARD = gql`
  mutation UPDATE_BOARD($id: Int!, $board: BoardInput! ){
    ${updateBoardQuery}(id:$id, board:$board)
  }
`;

export default {
  USER,
  INSERT_BOARD_MUTATION,
  GET_BOARD,
  UPDATE_BOARD,
};
