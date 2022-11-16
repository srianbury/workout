import { signUp } from "../signUp";
import { signIn } from "../signIn";

// authenticate(token: String!, method: String!): AuthenticationResponse!
async function authenticate(parent, args, context, info) {
  try {
    switch (args.method) {
      case "SIGN_UP":
        return await signUp(parent, args, context, info);
      case "SIGN_IN":
        return await signIn(parent, args, context, info);
      default:
        throw new Error(
          'Method provided not found.  Please use "SIGN_UP" or "SIGN_IN".'
        );
    }
  } catch (e) {
    console.log(e);
    return {
      authenticationError: {
        message: "An unexpected error occurred.",
      },
    };
  }
}

export { authenticate };
