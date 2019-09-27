import { ApolloLink } from "apollo-link";
import { jwt_token_type } from "../constant";
import { setContextHeader } from "../helpers";

export default new ApolloLink((operation, forward) => {
  const { operationName } = operation;
  const isWindow = typeof sessionStorage !== "undefined";
  // 제일 초기에 실행되는 쿼리는 스킵
  if (operationName !== "IntrospectionQuery") {
    setContextHeader(operation, {
      Authorization:
        isWindow &&
        `${jwt_token_type} ${sessionStorage.getItem("access_token")}`,
    });
  }
  return forward(operation);
});
