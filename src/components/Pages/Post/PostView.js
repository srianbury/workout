import Link from "next/link";
import Head from "next/head";
import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function PostView({ post }) {
  return (
    <div>
      <Head>
        <title>{post.title} | Workout</title>
      </Head>
      <main>
        <Box sx={{ mb: 1 }}>
          {post.videoUrlId ? (
            <LiteYouTubeEmbed
              id={post.videoUrlId}
              title="YouTube video player"
            />
          ) : null}
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
                alignItems="center"
              >
                <Link href={`/u/${post.user.username}/`}>
                  <Box
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Avatar
                      alt={post.user.initials}
                      src={
                        post.user.picture ||
                        `https://avatars.dicebear.com/api/initials/${post.user.initials}.svg`
                      }
                    >
                      <img
                        alt={post.user.initials}
                        src={
                          post.user.picture ||
                          `https://avatars.dicebear.com/api/initials/${post.user.initials}.svg`
                        }
                        referrerPolicy="no-referrer"
                      />
                    </Avatar>
                  </Box>
                </Link>
                <Box sx={{ ml: 1 }}>
                  <Link href={`/u/${post.user.username}/`}>
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
                  </Link>
                  <Box>0 Followers</Box>
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
        "createdAt": "2022-01-01T00:00:00.000Z",
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
