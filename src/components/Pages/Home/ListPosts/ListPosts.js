import { useState, useContext } from "react";
import {
  Alert,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "../../../Authenticator";
import { PostPreview, PostPreviewSkeleton } from "./PostPreview";

function ListPosts({ posts, variant }) {
  const { user } = useContext(AuthenticatorContext);
  if (posts && posts.length === 0) {
    return <Box>No posts found.</Box>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
            <PostPreview user={user} post={post} variant={variant} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
ListPosts.propTypes = {
  variant: PropTypes.oneOf(["Home", "User"]),
};
ListPosts.defaultProps = {
  variant: "Home",
};

function ListPostsSkeleton() {
  return (
    <Box>
      <Grid container spacing={2}>
        {[1, 2, 3].map((val) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={val}>
            <PostPreviewSkeleton />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export { ListPosts, ListPostsSkeleton };
