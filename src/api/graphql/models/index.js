let mockUsers = [
  {
    userId: 1,
    username: "brian",
  },
  {
    userId: 2,
    username: "steve",
  },
  {
    userId: 3,
    username: "bob",
  },
];

let mockPosts = [
  {
    postId: 1,
    shortDescription: "Full body",
    longDescription: "Full body workout",
    userId: 1,
  },
  {
    postId: 2,
    shortDescription: "At home",
    longDescription: "Full at home workout",
    userId: 3,
  },
];

function getMockUsersDict() {
  let d = {};
  mockUsers.forEach((user) => {
    d[user.userId] = user;
  });
  return d;
}

let mockUsersDict = getMockUsersDict();

export { mockUsers, mockPosts, mockUsersDict };
