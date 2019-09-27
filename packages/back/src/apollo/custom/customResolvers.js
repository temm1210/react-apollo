import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export default {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      // console.log("11:", value);
      return new Date(value); // value from the client
    },
    serialize(value) {
      // console.log("22:", value);
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      // console.log("33:");
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};
