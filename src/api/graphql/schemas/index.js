import { gql } from "apollo-server-micro";
import { UserSchema } from "./User";
import { PostSchema } from "./Post";

const linkSchema = gql`
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

const schema = [linkSchema, UserSchema, PostSchema];
export { schema };
