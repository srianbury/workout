import { getAuth } from "firebase-admin/auth";

async function signIn(parent, { token }, { models, firebaseApp }, info) {
  try {
    const auth = await getAuth(firebaseApp).verifyIdToken(token);
    const user = await models.models.User.findOne({ userId: auth.uid }).exec();

    console.log({ user });

    if (!user) {
      return {
        authenticationError: {
          type: "ACCOUNT_NOT_FOUND",
          message: "Account not found.",
        },
      };
    }

    return {
      user: {
        ...user["_doc"],
        token,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      authenticationError: {
        message: "An unexpected error occurred.",
      },
    };
  }
}

export { signIn };
