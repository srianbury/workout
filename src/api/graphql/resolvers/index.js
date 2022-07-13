const mockUsers = [
  {
    id: 1,
    username: "brian",
  },
  {
    id: 2,
    username: "steve",
  },
  {
    id: 3,
    username: "bob",
  },
];

const resolvers = {
  Query: {
    getUsers: async () => {
      return mockUsers;
    },
    getUserByUsername: async (parent, { username }) => {
      const user = mockUsers.find((user) => user.username === username);
      if (user) {
        return user;
      }
      return null;
    },
  },
};

export { resolvers };
