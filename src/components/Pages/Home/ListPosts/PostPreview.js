import { Box, Grid, Typography } from "@mui/material";

function PostPreview({ post }) {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      {post.videoUrlId ? (
        <img
          src={`https://img.youtube.com/vi/${post.videoUrlId}/sddefault.jpg`}
          style={{
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
        />
      ) : null}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <img
            src={`https://avatars.dicebear.com/api/initials/${post.user.initials}.svg`}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "50%",
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant="subtitle2"
            component="div"
            className="text-2"
            sx={{ fontWeight: "bold" }}
          >
            {post.title}
          </Typography>
          {post.videoUrlId ? null : (
            <Box className="text-5">{post.shortDescription}</Box>
          )}
          <Box>
            <Box component="span" sx={{ display: "inline" }}>
              <Typography variant="subtitle2" component="span">
                {post.user.username}
              </Typography>
            </Box>
            <Box component="span" sx={{ display: "inline", mx: 0.5 }}>
              <Typography variant="subtitle2" component="span">
                •
              </Typography>
            </Box>
            <Box component="span" sx={{ display: "inline" }}>
              <Typography variant="subtitle2" component="span">
                {new Date(post.createdTs).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export { PostPreview };
