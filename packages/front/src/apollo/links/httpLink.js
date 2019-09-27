import { HttpLink } from "apollo-link-http";

export default new HttpLink({
  uri: "http://localhost:4000/graphql",
  includeExtensions: true,
});
