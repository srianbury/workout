import { getAuth } from "firebase-admin/auth";

async function updateUserInfo(
  parent,
  { token, userInfo },
  { models, firebaseApp },
  info
) {
  try {
    console.log("updateUserInfo");
    const auth = await getAuth(firebaseApp).verifyIdToken(token);
    const user = await models.models.User.findOne({ userId: auth.uid }).exec();

    if (!user) {
      // TODO: add more logic here to say why it failed
      return {
        success: false,
        message: "Could not verify your account.",
      };
    }

    if (userInfo.username) {
      user.username = userInfo.username;
    }

    await user.save();
    return {
      success: true,
      user,
    };
  } catch (e) {
    console.log({ e });
    // add handler to return a special message in the username is already taken
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}

export { updateUserInfo };
