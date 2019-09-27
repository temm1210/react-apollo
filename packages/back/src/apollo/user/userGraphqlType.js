export default `
  type User {
    email: String
    username: String
    user_pic: String
    create_date: Date
    update_date: Date
    refresh_token: String
    access_token: String
  }

  type RefetchNewToken {
    access_token: String!
    refresh_token: String!
  }

  input UserInput {
    email: String!
    password: String!
    username: String!
    user_pic: String
    # refresh_token: String
  }
`;
