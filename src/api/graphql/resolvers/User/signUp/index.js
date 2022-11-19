import { getAuth } from "firebase-admin/auth";

async function signUp(parent, { token }, { models, firebaseApp }, info) {
  try {
    // ensure they don't already have an account
    const auth = await getAuth(firebaseApp).verifyIdToken(token);
    const user = await models.models.User.findOne({ userId: auth.uid }).exec();

    if (user) {
      return {
        authenticationError: {
          type: "ACCOUNT_ALREADY_EXISTS_PLEASE_SIGN_IN",
          message: "An account was already found.  Please sign in.",
        },
      };
    }

    const newUser = new models.models.User({
      userId: auth.uid,
      username: auth.uid,
      email: auth.email,
      picture: auth.picture,
    });

    await newUser.save();

    return {
      user: {
        ...newUser["_doc"],
        token,
      },
    };
  } catch (e) {
    return {
      authenticationError: {
        message: "An unexpected error occurred.",
      },
    };
  }
}

export { signUp };
