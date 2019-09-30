import { boardFields } from "db/schemas";
import resolver from "./schemaName";

export default {
  Query: {
    [resolver.query.GET_BOARD_LIST]: async (
      _,
      { listSize = 4, cursor = 0 },
      { dataSources: { boardAPI } },
    ) => {
      const boardList = await boardAPI.getBoardList(listSize, cursor);
      const nextCursor = cursor ? cursor + listSize : listSize;

      // console.log("data:", {
      //   cursor: nextCursor,
      //   hasMore: boardList.length === listSize,
      //   board: boardList,
      // });
      return {
        cursor: nextCursor,
        hasMore: boardList.length === listSize,
        board: boardList,
      };
    },

    [resolver.query.GET_BOARD]: async (
      _,
      { id },
      { dataSources: { boardAPI } },
    ) => {
      const board = await boardAPI.getBoard({ [boardFields.ID]: id });
      const updateView = board.views + 1;
      boardAPI.updateBoard(id, { views: updateView });

      const newBoard = { ...board, views: updateView };

      // console.log("board:", board);

      return newBoard;
    },
  },

  Mutation: {
    [resolver.mutation.INSERT_BOARD]: async (
      _,
      { board },
      { dataSources: { boardAPI } },
    ) => {
      const result = await boardAPI.insertBoard(board);
      return result.insertId;
    },

    [resolver.mutation.DELETE_BOARD]: async (
      _,
      { id },
      { dataSources: { boardAPI } },
    ) => {
      const result = await boardAPI.deleteBoard(id);
      return !!result;
    },

    [resolver.mutation.UPDATE_BOARD]: async (
      _,
      { id, board },
      { dataSources: { boardAPI } },
    ) => {
      const result = await boardAPI.updateBoard(id, board);
      return !!result;
    },
  },
};
