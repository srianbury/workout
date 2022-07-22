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
    email: "alfredo@mail.com",
    username: "alfredo",
  },
];

let mockPosts = [
  {
    postId: 1,
    title:
      "Chris Hemsworth's Workout Explained By His Personal Trainer | Train Like a Celebrity | Men's Health",
    shortDescription: "Full body",
    longDescription: "Describe the workout here",
    createdTs: new Date("2022-01-01"),
    videoUrlId: "Kuv0xThzxrU",
    userId: 1,
  },
  {
    postId: 2,
    title:
      "Manny Jacinto's Functional Workout For Total Body Strength | Train Like | Men's Health",
    shortDescription: "At home",
    longDescription: "Describe the workout here",
    createdTs: new Date("2022-03-01"),
    videoUrlId: "GepY4bgjGNA",
    userId: 3,
  },
  {
    postId: 3,
    title: "This workout does not have a video",
    shortDescription:
      "Luke Zocchi, Chris Hemsworth's personal trainer, takes us to Hemsworth's home in Byron Bay Australia, where he puts Hemsworth's stunt double through the workout he designed for Hemsworth for the new Men In Black Movie. ",
    longDescription: "Describe the workout here",
    createdTs: new Date("2022-05-24"),
    userId: 2,
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
