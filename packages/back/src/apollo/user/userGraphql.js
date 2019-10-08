import schemaName from "./schemaName";

export default `
  type Query {
    ${schemaName.query.GET_USER_BY_EMAIL}(email: String!): User
    ${schemaName.query.GET_NEW_TOKEN}(email: String!): RefetchNewToken!
    ${schemaName.query.GET_USER_BY_UESRNAME}(username: String!): Boolean
  }

  type Mutation {
    ${schemaName.mutation.INSERT_USER}(user: UserInput!): Boolean
    ${schemaName.mutation.SEND_AUTH_KEY}(email: String!): Boolean
    ${schemaName.mutation.IS_MATCH_AUTH_KEY}(authKey: String!): Boolean!
    ${schemaName.mutation.USER_LOGIN}(email: String!, password: String!): User
  }
`;
// type Query {
//   getUserByEmail(email: String!): User
//   getNewToken(email: String!): RefetchNewToken!
//   test: String!
// }

// type Mutation {
//   insertUser(user: UserInput!): Boolean
//   sendAuthKey(email: String!): Boolean
//   isMatchAuthKey(authKey: String!): Boolean!
//   userLogin(email: String!, password: String!): User
// }
