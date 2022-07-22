import { userResolver } from "./User";
import { postResolver } from "./Post";
import { customScalarResolver } from "./customScalarResolver";

const resolvers = [userResolver, postResolver, customScalarResolver];
export { resolvers };
