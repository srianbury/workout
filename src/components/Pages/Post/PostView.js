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
          <PostMedia media={post.media} />
        </Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            mb: 1,
            fontWeight: "bold",
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

function PostMedia({ media }) {
  if (media?.photo) {
    return (
      <img
        src={media.photo}
        style={{
          width: "100%",
          height: "auto",
          margin: "auto",
        }}
      />
    );
  }

  if (media?.video?.source === "YOUTUBE") {
    return (
      <LiteYouTubeEmbed id={media.video.id} title="YouTube video player" />
    );
  }

  return null;
}

export { PostView };
