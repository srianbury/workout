import { User } from "./User";
import { Post } from "./Post";

let mockUsers = [
  {
    userId: 1,
    email: "brian@mail.com",
    username: "brian",
    token: "faketoken",
  },
  {
    userId: 2,
    email: "steve@mail.com",
    username: "steve",
    token: "faketoken",
  },
  {
    userId: 3,
    email: "alfredo@mail.com",
    username: "alfredo",
    token: "faketoken",
  },
  {
    userId: 4,
    email: "bilbo@mail.com",
    username: "bil",
    token: "faketoken",
  },
];

let mockPosts = [
  {
    postId: 1,
    title:
      "Chris Hemsworth's Workout Explained By His Personal Trainer | Train Like a Celebrity | Men's Health",
    shortDescription: "Full body",
    longDescription:
      "Warm Up\n1. Bear Crawl - 20s On, 10s Off (10 Rounds)\n2. Bodyweight Squat - 20s On, 10s Off (10 Rounds)\n\nThe Workout - 8 Weighted Exercises for 8 Reps & 3 Core Exercises (Repeat Circuit 3 Times)\n1. Weighted Burpee\n2. Curl & Press\n3. Goblet Squat\n4. Standing Tricep Extension\n5. Reverse Lunge Curl\n6. Lat Raise, Front Raise, Upright Row\n7. Plank Punch Out, Plank Pulse, Plank Pike",
    createdAt: new Date("2022-01-01"),
    media: {
      video: {
        source: "youtube",
        id: "Kuv0xThzxrU",
      },
    },
    userId: 1,
  },
  {
    postId: 2,
    title:
      "Manny Jacinto's Functional Workout For Total Body Strength | Train Like | Men's Health",
    shortDescription: "At home",
    longDescription: "Describe the workout here",
    createdAt: new Date("2022-03-01"),
    media: {
      video: {
        source: "youtube",
        id: "GepY4bgjGNA",
      },
    },
    userId: 3,
  },
  {
    postId: 3,
    title: "This workout does not have a video",
    shortDescription:
      "Luke Zocchi, Chris Hemsworth's personal trainer, takes us to Hemsworth's home in Byron Bay Australia, where he puts Hemsworth's stunt double through the workout he designed for Hemsworth for the new Men In Black Movie. ",
    longDescription: "Describe the workout here",
    createdAt: new Date("2022-05-24"),
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

const models = {
  User,
  Post,
};

export { mockUsers, mockPosts, mockUsersDict, models };
