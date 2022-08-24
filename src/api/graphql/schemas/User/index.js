import { gql } from "apollo-server-micro";

const userSchema = gql`
  extend type Query {
    getUsers: [User!]!
    getUserByUsername(username: String!): User
  }

  extend type Mutation {
    login(token: String!): User
    signUp(token: String!, provider: String!): User
    authenticate(token: String!, method: String!): AuthenticationResponse!
    updateUserInfo(token: String!, userInfo: UserInfo!): UpdateUserInfoResponse!
  }

  type User {
    userId: ID!
    email: String!
    initials: String!
    username: String!
    picture: String
    token: String!
    posts: [Post!]!
  }

  input UserInfo {
    username: String
  }

  type UpdateUserInfoResponse {
    success: Boolean!
    message: String
    user: User
  }

  type AuthenticationError {
    type: String
    message: String!
  }

  type AuthenticationResponse {
    authenticationError: AuthenticationError
    user: User
  }
`;

export { userSchema };
