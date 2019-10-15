import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import jwt from "jsonwebtoken";
import path from "path";
import pool, { UserAPI, BoardAPI } from "db";

import { userFields } from "../db/schemas";

const typeDefs = fileLoader(path.join(__dirname, "/**/*Graphql*.js"));
const resolvers = fileLoader(path.join(__dirname, "/**/*Resolvers.js"));

export const schema = makeExecutableSchema({
  typeDefs: mergeTypes(typeDefs),
  resolvers: mergeResolvers(resolvers),
});

export default () => {
  const userAPI = new UserAPI(pool);
  const boardAPI = new BoardAPI(pool);

  // boardAPI.testBoard();

  return new ApolloServer({
    schema,
    dataSources: () => ({
      userAPI,
      boardAPI,
    }),
    // query를 apollo-link의 execute로 실행시 operation값들은 req.body에 담겨서옴
    context: async ({ req }) => {
      const {
        headers: { authorization },
        body: { extensions },
      } = req;

      try {
        // 클라이언트에서 extensions를 허용해주면 해당값이 담겨줘서 넘어옴
        const grant_type = extensions && extensions.grant_type;
        const refresh_token = extensions && extensions.refresh_token;
        const jwtToken =
          grant_type && grant_type === "refresh_token"
            ? refresh_token.replace("Bearer ", "").trim()
            : authorization.replace("Bearer ", "").trim();

        if (jwtToken === "null" || jwtToken === "undefined") {
          return { user: null };
        }

        const jwtDecoded = jwt.verify(jwtToken, process.env.jwt_secret);
        const user = await userAPI.getUser({
          [userFields.EMAIL]: jwtDecoded.data,
        });

        return { user };
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          console.log("EXPIRED!!!!!");
          throw new AuthenticationError("Token expired");
        }
      }
    },
  });
};
