import gql from "graphql-tag";

// User타입은 Server에 저장되어있음
// extend는 server단 스키마와 클라이언트 스키마 모두에서 타입을가져와서
// 확장할수 있게해주는 타입
// 비슷한 기능으로 (ApolloConsumer의 client에 addResolver도 있음)

export const clientSchemaName = {
  query: {
    GET_LOGIN_USER_CLI: "getLoginUserCli",
  },
};

// user @client 방식으로 사용하면
// 바로 캐시에 저장된 데이터를 먼저 찾아봄
export default gql`
  extend type Query {
    # getLoginUserCli: User!
    user: User!
    test: String
  }
`;
