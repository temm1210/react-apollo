import { HttpLink } from "apollo-link-http";

export default new HttpLink({
  uri: "https://stwport.herokuapp.com/api",
  includeExtensions: true,
});
