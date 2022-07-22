import { gql } from "apollo-server-micro";
import { userSchema } from "./User";
import { postSchema } from "./Post";

const linkSchema = gql`
  scalar DateTime

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

const schema = [linkSchema, userSchema, postSchema];
export { schema };
