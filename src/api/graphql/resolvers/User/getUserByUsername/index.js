async function getUserByUsername(parent, { username }, { models }, info) {
  try {
    const user = await models.models.User.findOne({ username }).exec();
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
}

export { getUserByUsername };
