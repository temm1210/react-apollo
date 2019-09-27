import schemaName from "./schemaName";

export default `
    type Query {
        ${schemaName.query.GET_BOARD_LIST}(listSize:Int, cursor:Int):BoardList
        ${schemaName.query.GET_BOARD}(id: Int!): Board!
    }

    type Mutation {
        ${schemaName.mutation.INSERT_BOARD}(board: BoardInput!): Int!
        ${schemaName.mutation.DELETE_BOARD}(id: Int!): Boolean
        ${schemaName.mutation.UPDATE_BOARD}(id: Int!, board: BoardInput!): Boolean
    }
`;
