import { getAuth } from "firebase-admin/auth";

/*
  Cases:
    1. https://youtu.be/dr0tzAZ4MMo
    2. https://www.youtube.com/watch?v=dr0tzAZ4MMo
*/
function extractVideoInformationFromYouTubeUrl(domain, url) {
  if (domain === "youtu") {
    const parts = url.split(".be/");
    if (parts.length >= 2) {
      return parts[1];
    }
    return null;
  }

  const parts = url.split("?");
  if (parts.length < 2) {
    return null;
  }

  const queryParams = parts[1];
  const params = queryParams.split("&");
  for (const pair of params) {
    const tuple = pair.split("=");
    if (tuple[0] === "v") {
      const youtubeVideoId = tuple[1];
      if (!youtubeVideoId || youtubeVideoId.length !== 11) {
        // youtube IDs are 11 characters long
        return null;
      }
      return youtubeVideoId;
    }
  }

  return null;
}

function getDomain(url) {
  if (!url) {
    return null;
  }
  let domain = url.replace(/.+\/\/|www.|\..+/g, "");

  if (!domain) {
    return null;
  }

  switch (domain.toLowerCase()) {
    case "youtube":
    case "youtu":
      return "YOUTUBE";
    default:
      return null;
  }
}

function extractVideoInformation(url) {
  if (!url) {
    return null;
  }

  const domain = getDomain(url);

  if (!domain) {
    return null;
  }

  let id;
  switch (domain.toLowerCase()) {
    case "youtube":
    case "youtu":
      id = extractVideoInformationFromYouTubeUrl(domain, url);
      break;
    default:
      id = null;
      break;
  }

  if (!id) {
    return null;
  }

  return {
    source: domain.toUpperCase(),
    id,
  };
}

async function createPost(parent, args, { models, firebaseApp }, info) {
  try {
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

    let media = {};
    const videoInfo = extractVideoInformation(videoSource);
    if (videoInfo) {
      media.video = videoInfo;
    }

    const newPost = new models.models.Post({
      userId: auth.uid,
      title,
      shortDescription,
      longDescription,
      media,
    });

    await newPost.save();
    const result = {
      ...newPost._doc,
      user,
    };
    return result;
  } catch (e) {
    return null;
  }
}

export { createPost };
