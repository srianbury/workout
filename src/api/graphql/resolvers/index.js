import { userResolver } from "./User";
import { postResolver } from "./Post";

const resolvers = [userResolver, postResolver];
export { resolvers };
