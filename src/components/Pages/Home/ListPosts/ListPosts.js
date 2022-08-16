import { Box, Grid } from "@mui/material";
import { PostPreview } from "./PostPreview";
import PropTypes from "prop-types";

function ListPosts({ posts, variant }) {
  return (
    <Box>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
            <PostPreview post={post} variant={variant} />
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

export { ListPosts };
