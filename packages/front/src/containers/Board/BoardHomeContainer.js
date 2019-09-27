import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import BoardHome from "components/pages/Board/BoardHome";
import { Loading } from "components/base";
import schemaName from "back/src/apollo/board/schemaName";

const getBoardList = schemaName.query.GET_BOARD_LIST;

const GET_BOARD_LIST = gql`
  query GET_BOARD_LIST($listSize:Int, $cursor: Int) {
    ${getBoardList}(listSize:$listSize,cursor:$cursor) {
      cursor
      hasMore
      board {
        id
        username
        title
        content
        represent_img
        likes
        views
        create_date
        update_date
      }
    }
  }
`;
function BoardHomeContainer() {
  const { loading, error, data, fetchMore } = useQuery(GET_BOARD_LIST, {
    fetchPolicy: "network-only",
  });
  const queryData = data && data[getBoardList];

  const handleClick = () => {
    fetchMore({
      variables: {
        cursor: queryData.cursor,
      },

      // 첫번째 인자는 이전쿼리결과값(prev, {})에서 prev가 해당
      // 여기서 리턴한 값이 위에 useQuery의 결과값인
      // data로 다시 들어감
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const fetchData = fetchMoreResult[getBoardList];
        const prevData = prev[getBoardList];

        const nextData = {
          [getBoardList]: {
            ...fetchData,
            board: [...prevData.board, ...fetchData.board],
          },
        };
        return nextData;
      },
    });
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return <BoardHome handleClick={handleClick} data={queryData} />;
}

export default BoardHomeContainer;
