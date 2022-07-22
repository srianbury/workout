import { Box } from "@mui/material";
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
      {data.getPosts.map((post) => (
        <PostPreview key={post.postId} post={post} />
      ))}
    </Box>
  );
}

export { ListPosts };
