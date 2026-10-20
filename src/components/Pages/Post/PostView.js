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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
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
  const [favoritePost] = useMutation(gql`
    mutation ($postId: ID!, $operation: String!) {
      favoritePost(postId: $postId, operation: $operation)
    }
  `);

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

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  mr: 1,
                }}
              >
                {post.title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              sx={{
                mb: 1,
              }}
            >
              {favoriting ? (
                <CircularProgress size={25} />
              ) : post.favorited ? (
                <FavoriteIcon
                  data-cy="favorited-icon"
                  onClick={onFavoriteClick}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  data-cy="not-favorited-icon"
                  onClick={onFavoriteClick}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Typography component="div" sx={{ mb: 2 }}>
          <span data-cy="num-favorites">{`${post.favorites} favorite${post.favorites === 1 ? "" : "s"}`}</span>{" "}
          • {new Date(post.createdAt).toLocaleDateString()}
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
                        `https://api.dicebear.com/10.x/initials/svg?seed=${post.user.initials}`
                      }
                    >
                      <img
                        alt={post.user.initials}
                        src={
                          post.user.picture ||
                          `https://api.dicebear.com/10.x/initials/svg?seed=${post.user.initials}`
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
            <Options post={post} refetch={refetch} />
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

function Options({ post, refetch }) {
  const postOwnerId = post?.user?.id;
  const { user } = useContext(AuthenticatorContext);
  const router = useRouter();

  function afterDelete() {
    router.push(`/u/${user.username}`);
  }

  if (user && postOwnerId && user.id === postOwnerId) {
    return (
      <DeletePostDialogContextProvider afterDeleteCb={afterDelete}>
        <PostActionItem postId={post.postId} />
      </DeletePostDialogContextProvider>
    );
  }

  return post.user.following ? (
    <UnfollowButton user={user} post={post} refetch={refetch} />
  ) : (
    <FollowButton user={user} post={post} refetch={refetch} />
  );
}

function FollowButton({ user, post, refetch }) {
  const [follow, { loading }] = useMutation(gql`
    mutation ($username: String!) {
      followUser(username: $username)
    }
  `);

  async function handleFollowClick() {
    const response = await follow({
      variables: { username: post.user.username },
      context: {
        headers: {
          authorization: user?.token,
        },
      },
    });
    console.log("follow", { response });
    if (response?.data?.followUser) {
      await refetch({ postId: post.postId });
    }
  }

  return (
    <Button variant="contained" onClick={handleFollowClick} disabled={loading}>
      {loading ? <CircularProgress sx={{ mr: 1 }} size={20} /> : "Follow"}
    </Button>
  );
}

function UnfollowButton({ user, post, refetch }) {
  const [open, setOpen] = useState(false);
  const [unfollow, { loading }] = useMutation(gql`
    mutation ($username: String!) {
      unfollowUser(username: $username)
    }
  `);

  async function handleUnfollowClick() {
    const response = await unfollow({
      variables: { username: post.user.username },
      context: {
        headers: {
          authorization: user?.token,
        },
      },
    });
    console.log("unfollow", { response });
    if (response?.data?.unfollowUser) {
      await refetch({ postId: post.postId });
    }
  }

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle id="alert-dialog-title">Unfollow</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Unfollow {post.user.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" color="neutral">
            Cancel
          </Button>
          <Button
            onClick={handleUnfollowClick}
            variant="contained"
            color="error"
          >
            Unfollow
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={openDialog} disabled={loading}>
        Following
      </Button>
    </>
  );
}

export { PostView, PostViewSkeleton };
