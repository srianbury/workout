import Head from "next/head";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function PostView({ post }) {
  console.log({ post });
  return (
    <div>
      <Head>
        <title>{post.title} | Workout</title>
      </Head>
      <main>
        <Box sx={{ mb: 1 }}>
          <LiteYouTubeEmbed id={post.videoUrlId} title="YouTube video player" />
        </Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            mb: 1,
            fontWeight: "bold",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          {post.title}
        </Typography>
        <Card variant="outlined" sx={{ mb: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            sx={{ p: 1 }}
          >
            <div>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Box sx={{ mr: 1 }}>
                  <img
                    src={`https://avatars.dicebear.com/api/initials/${post.user.initials}.svg`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50%",
                      maxWidth: "50px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {post.user.username}
                </Box>
              </Grid>
            </div>
            <Button variant="outlined">Follow</Button>
          </Grid>
        </Card>
        <Box sx={{ whiteSpace: "pre-wrap" }}>{post.longDescription}</Box>
      </main>
    </div>
  );
}

/**
 * {
    "post": {
        "__typename": "Post",
        [x] "postId": "1",
        [x] "title": "Chris Hemsworth's Workout Explained By His Personal Trainer | Train Like a Celebrity | Men's Health",
        [x] "shortDescription": "Full body",
        "longDescription": "Describe the workout here",
        "createdTs": "2022-01-01T00:00:00.000Z",
        "videoUrlId": "Kuv0xThzxrU",
        "user": {
            "__typename": "User",
            "userId": "1",
            "username": "brian",
            "initials": "b"
        }
    }
}
 */

export { PostView };
