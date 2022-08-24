import { getAuth } from "firebase-admin/auth";

async function createPost(parent, args, { models, firebaseApp }, info) {
  try {
    console.log("creating post");
    const { token, title, shortDescription, longDescription, videoSource } =
      args;
    const auth = await getAuth(firebaseApp).verifyIdToken(token);
    const user = await models.models.User.findOne({ userId: auth.uid }).exec();

    if (!user) {
      // TODO: FINISH
      return {
        authenticationError: {
          type: "ACCOUNT_ALREADY_EXISTS_PLEASE_SIGN_IN",
          message: "An account was already found.  Please sign in.",
        },
      };
    }

    const newPost = new models.models.Post({
      userId: auth.uid,
      title,
      shortDescription,
      longDescription,
      media: {
        video: {
          source: videoSource, // TODO: extract source i.e. youtube/vimeo
          id: videoSource, // TODO: extract ID i.e. youtube video ID
        },
      },
    });

    await newPost.save();
    const result = {
      ...newPost._doc,
      user,
    };
    console.log({ result });
    return result;
  } catch (e) {
    console.log({ e });
    return null;
  }
}

export { createPost };
