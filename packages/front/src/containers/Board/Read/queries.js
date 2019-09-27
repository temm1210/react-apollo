import gql from "graphql-tag";
import schemaName from "back/src/apollo/board/schemaName";

export const getBoardQuery = schemaName.query.GET_BOARD;
export const deleteBoardQuery = schemaName.mutation.DELETE_BOARD;

// 선택한 게시물 가져오는 쿼리
const GET_BOARD = gql`
    query GET_BOARD($id: Int!) {
        ${getBoardQuery}(id:$id) {
            id
            username
            title
            content
            likes
            views
            create_date
        }
    }
`;

// 현재 로그인된 유저의 닉네임을 가져오는 client 쿼리
const GET_USERNAME = gql`
  query {
    user @client {
      username
    }
  }
`;

// 삭제 버튼을 클릭했을때 작동하는 쿼리
const DELETE_BOARD = gql`
  mutation DELETE_BOARD($id: Int!) {
    ${deleteBoardQuery}(id:$id)
  }
`;

export default {
  GET_BOARD,
  GET_USERNAME,
  DELETE_BOARD,
};
