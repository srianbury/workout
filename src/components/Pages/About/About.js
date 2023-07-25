import Head from "next/head";
import { Box } from "@mui/material";

function About() {
  return (
    <div>
      <Head>
        <title>Workout | About</title>
      </Head>
      <main>
        <h1>About this Platform</h1>
        <Box>
          <h2>
            Platform (name TBD) is a place to share and find workouts and
            fitness related content. It&#39;s still in its early stages and I
            appriciate you checking it out and while I work on getting it past
            an MVP! You can share your thoughts, questions, or anything else
            with me at bsunbury29@gmail.com :)
          </h2>
        </Box>
      </main>
    </div>
  );
}

export { About };
