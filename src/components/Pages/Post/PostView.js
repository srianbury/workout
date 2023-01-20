import { useState, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
  Skeleton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "../../Authenticator";
import { PostActionItem } from "../../PostActionItem";
import { DeletePostDialogContextProvider } from "../../DeletePostDialog";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function PostView({ post, refetch }) {
  const [favoriting, setFavoriting] = useState(false);
  const { user } = useContext(AuthenticatorContext);
  const [favoritePost] = useMutation(
    gql`
      mutation ($postId: ID!, $operation: String!) {
        favoritePost(postId: $postId, operation: $operation)
      }
    `
  );

  async function onFavoriteClick() {
    try {
      if (favoriting) {
        return;
      }

      setFavoriting(true);
      if (!user) {
        return;
      }

      const result = await favoritePost({
        variables: {
          postId: post.postId,
          operation: post.favorited ? "UNLIKE" : "LIKE",
        },
        context: {
          headers: {
            authorization: user?.token,
          },
        },
      });

      if (result && result.data && result.data.favoritePost) {
        await refetch({ postId: post.postId });
      }
    } catch (e) {
      console.log({ e });
    } finally {
      setFavoriting(false);
    }
  }

  return (
    <div>
      <Head>
        <title>{post.title} | Workout</title>
      </Head>
      <main>
        <Box sx={{ mb: 2 }}>
          <PostMedia media={post.media} />
        </Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            fontWeight: "bold",
          }}
        >
          {post.title}
        </Typography>
        <Typography component="div">
          {`${post.favorites} favorite${post.favorites === 1 ? "" : "s"}`} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            mb: 1,
            pr: 1,
          }}
        >
          {favoriting ? (
            <CircularProgress size={25} />
          ) : post.favorited ? (
            <FavoriteIcon onClick={onFavoriteClick} />
          ) : (
            <FavoriteBorderIcon onClick={onFavoriteClick} />
          )}
        </Grid>
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
            <Options postId={post.postId} postOwnerId={post.user.userId} />
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

function PostViewSkeleton() {
  return (
    <div>
      <main>
        <Box sx={{ mb: 1 }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ mb: 1 }}
          />
        </Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            mb: 1,
            fontWeight: "bold",
          }}
        >
          <Skeleton />
        </Typography>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            mb: 1,
            fontWeight: "bold",
          }}
        >
          <Skeleton />
        </Typography>
      </main>
    </div>
  );
}

function Options({ postId, postOwnerId }) {
  const { user } = useContext(AuthenticatorContext);
  const router = useRouter();

  function afterDelete() {
    router.push(`/u/${user.username}`);
  }

  return user && postOwnerId && user.userId === postOwnerId ? (
    <DeletePostDialogContextProvider afterDeleteCb={afterDelete}>
      <PostActionItem postId={postId} />
    </DeletePostDialogContextProvider>
  ) : (
    <FollowButton />
  );
}

function FollowButton() {
  return <Button variant="outlined">Follow</Button>;
}

export { PostView, PostViewSkeleton };
