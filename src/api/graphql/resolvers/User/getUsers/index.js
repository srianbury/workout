async function getUsers(parent, args, { models }, info) {
  return models.mockUsers;
}

export { getUsers };
