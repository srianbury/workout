# next-start

## Getting Started

1. clone
2. `yarn` or `npm install` to install dependencies
3. `yarn dev` or `npm run dev` to start local server
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## From Nextjs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### How I built the GraphQL Server

1. [robinwieruch.de/graphql-apollo-server-tutorial](https://www.robinwieruch.de/graphql-apollo-server-tutorial/)
2. [GraphQL with MongoDB](https://medium.com/geekculture/graphql-with-mongodb-and-expressjs-26e1b94ab886)
3. [Docker for local development with hot-reloading](https://medium.com/bb-tutorials-and-thoughts/react-local-development-with-docker-compose-5a247710f997)
4. [AWS CoPilot for Amazon ECS](https://aws.github.io/copilot-cli/docs/getting-started/first-app-tutorial/)

## Docker Setup [source](https://nextjs.org/docs/deployment#docker-image)

1. `docker build -t workout-docker:0.1 .`
2. `docker run -p 3000:3000 workout-docker:0.1`

## Functional Requirements (MVP)

1. Post workouts
1. Follow other users
1. Mark workouts as favorites
1. Display some sort of timeline
1. Workouts only contain text
1. Search for a workout and or user

## Extended requirements

1. Workout posts can contain photos
1. Tags maybe?
1. Comments on a workout?
1. Trending workouts?
1. Tag users?
1. Follow/workout suggestions

## Architecture?

1. Dockerize app
1. Deploy to aws

## TODO:

1. Continue to build out the design in order to see what features we need to add
