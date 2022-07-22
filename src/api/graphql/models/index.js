let mockUsers = [
  {
    userId: 1,
    email: "brian@mail.com",
    username: "brian",
  },
  {
    userId: 2,
    email: "steve@mail.com",
    username: "steve",
  },
  {
    userId: 3,
    email: "bob@mail.com",
    username: "bob",
  },
];

let mockPosts = [
  {
    postId: 1,
    title:
      "Chris Hemsworth's Workout Explained By His Personal Trainer | Train Like a Celebrity | Men's Health",
    shortDescription: "Full body",
    longDescription: "Full body workout",
    createdTs: new Date("2022-01-01"),
    videoUrlId: "Kuv0xThzxrU",
    userId: 1,
  },
  {
    postId: 2,
    title:
      "Manny Jacinto's Functional Workout For Total Body Strength | Train Like | Men's Health",
    shortDescription: "At home",
    longDescription: "Full at home workout",
    createdTs: new Date("2022-03-01"),
    videoUrlId: "GepY4bgjGNA",
    userId: 3,
  },
  {
    postId: 2,
    title: "This workout does not have a video",
    shortDescription: "At home",
    longDescription: "Full at home workout",
    createdTs: new Date("2022-05-24"),
    userId: 1,
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
