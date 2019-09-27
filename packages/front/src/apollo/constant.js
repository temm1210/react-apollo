import jwt from "jsonwebtoken";
import gql from "graphql-tag";
import schemaName from "back/src/apollo/user/schemaName";

const getUserByEmail = schemaName.query.GET_USER_BY_EMAIL;
const getNewToken = schemaName.query.GET_NEW_TOKEN;

const isWindow = typeof sessionStorage !== "undefined";

export const jwt_token_type = "Bearer";
export const jwt_decode =
  isWindow && jwt.decode(sessionStorage.getItem("access_token"));

// 페이지가 새로 로드될때(새로고침등..) 실행될 operation
export const loginOperation = {
  name: getUserByEmail,
  operation: {
    query: gql`
    query GET_UESR_BY_EMAIL($email: String!) {
      ${getUserByEmail}(email: $email) {
        email
        username
        user_pic
        create_date
        update_date
      }
    }
  `,
    variables: { email: jwt_decode && jwt_decode.data },
    // context: {} //optional
    // extensions: {} //optional
  },
};

// access token 만료시 사용할 operation
export const getTokenOperation = {
  name: getNewToken,
  operation: {
    query: gql`
    query GET_NEW_TOKEN($email: String!) {
      ${getNewToken}(email: $email) {
        access_token
        refresh_token
      }
    }
  `,
    variables: { email: jwt_decode && jwt_decode.data },
    extensions: {
      grant_type: "refresh_token",
      refresh_token:
        isWindow &&
        `${jwt_token_type} ${sessionStorage.getItem("refresh_token")}`,
      // client_id: "client_react",
      // client_secret: "my_secret",
    },
  },
};
