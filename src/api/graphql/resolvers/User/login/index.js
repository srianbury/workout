import { OAuth2Client } from "google-auth-library";

async function login(parent, { token }, { models }, info) {
  const user = new models.models.User({ username: "brian" });
  console.log({ user });

  try {
    const client = new OAuth2Client(
      process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
    );
    const ticket = await client.verifyIdToken({
      idToken: token,
    });
    const payload = ticket.getPayload();

    const user = {
      userId: new Date().getTime(),
      email: payload.email,
      initials: payload.email[0],
      username: payload.email.split("@")[0],
      token,
      posts: [],
    };

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export { login };
