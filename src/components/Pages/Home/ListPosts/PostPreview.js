import Link from "next/link";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

function PostPreview({ post, variant }) {
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
          <ProfilePic post={post} variant={variant} />
        </Grid>
        <Grid item xs={10}>
          <Link href={`/p/${post.postId}/`}>
            <Typography
              variant="subtitle2"
              component="div"
              className="text-2"
              sx={{
                fontWeight: "bold",
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
            >
              {post.title}
            </Typography>
          </Link>
          {post.videoUrlId ? null : (
            <Box className="text-5">{post.shortDescription}</Box>
          )}
          <Box>
            {variant === "User" ? null : (
              <>
                <Box
                  component="span"
                  sx={{
                    display: "inline",
                    "&:hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                >
                  <Link href={`/u/${post.user.username}/`}>
                    <Typography
                      variant="subtitle2"
                      component="span"
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {post.user.username}
                    </Typography>
                  </Link>
                </Box>
                <Box component="span" sx={{ display: "inline", mx: 0.5 }}>
                  <Typography variant="subtitle2" component="span">
                    •
                  </Typography>
                </Box>
              </>
            )}
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
PostPreview.propTypes = {
  variant: PropTypes.oneOf(["Home", "User"]),
};
PostPreview.defaultProps = {
  variant: "Home",
};

function ProfilePic({ post, variant }) {
  if (variant === "User") {
    return <Image post={post} />;
  }

  return (
    <Link href={`/u/${post.user.username}/`}>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Image post={post} />
      </Box>
    </Link>
  );
}

function Image({ post }) {
  return (
    <img
      src={`https://avatars.dicebear.com/api/initials/${post.user.initials}.svg`}
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "50%",
      }}
    />
  );
}

export { PostPreview };
