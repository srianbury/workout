import { Box, Grid } from "@mui/material";
import { PostPreview } from "./PostPreview";

function ListPosts({ loading, error, data }) {
  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>An unexpected error occurred.</Box>;
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {data.getPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.postId}>
            <PostPreview post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export { ListPosts };
