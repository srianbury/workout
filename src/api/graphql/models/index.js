let mockUsers = [
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

let mockPosts = [
  {
    id: 1,
    shortDescription: "Full body",
    longDescription: "Full body workout",
    creatorId: 1,
  },
  {
    id: 2,
    shortDescription: "At home",
    longDescription: "Full at home workout",
    creatorId: 3,
  },
];

function getMockUsersDict() {
  let d = {};
  mockUsers.forEach((user) => {
    d[user.id] = user;
  });
  return d;
}

let mockUsersDict = getMockUsersDict();

export { mockUsers, mockPosts, mockUsersDict };
