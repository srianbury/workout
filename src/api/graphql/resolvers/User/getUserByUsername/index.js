async function getUserByUsername(parent, { username }, { models }, info) {
  try {
    const user = await models.models.User.findOne({ username }).exec();
    console.log({ user });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.log({ e });
    return null;
  }
}

export { getUserByUsername };
