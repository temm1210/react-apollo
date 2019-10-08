import { ApolloClient } from "apollo-client";
import { execute } from "apollo-link";

import cache from "./cache";
import link, { httpLink } from "./links";
import resolvers from "./resolvers";
import typeDefs from "./types";
// additional
import { jwt_decode, loginOperation } from "./constant";

// apollo server와 통신할때 제일먼저 authLink를 실행
// server에서 에러를 throw하면 errorLink가 실행
// errorLink에서 에러후처리후 return forward를 하면 error발생전
// operation이 재실행됨. (이때 다시 authLink를 실행하지 않음)

export const init = () => {
  if (jwt_decode) {
    execute(httpLink, loginOperation.operation).subscribe({
      next: ({ data }) => {
        const loginUser = data[loginOperation.name];
        const user = { ...loginUser, __typename: loginUser.email };

        cache.writeData({ data: { user } });
      },
      error: error => {
        console.error("initLogin query Error");
        throw new Error(error);
      },
    });
  }
};

export default new ApolloClient({
  typeDefs,
  resolvers,
  cache,
  link,
});
