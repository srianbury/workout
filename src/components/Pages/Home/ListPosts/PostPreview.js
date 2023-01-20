import Link from "next/link";
import { Avatar, Box, CardHeader, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { PostActionItem } from "../../../PostActionItem";

function PostPreview({ user, post, variant }) {
  function userOwnsPost() {
    if (!user || !user.userId) {
      return false;
    }

    return user?.userId === post?.user?.userId;
  }

  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <PostPreviewThumbnail post={post} />
      <CardHeader
        sx={{
          m: 0,
          p: 0,
          WebkitAlignItems: "start",
        }}
        avatar={<ProfilePic post={post} variant={variant} />}
        title={
          <Box>
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
            {post?.media?.photo || post?.media?.video ? null : (
              <Box className="text-5">{post.shortDescription}</Box>
            )}
            <Box>
              {variant === "User" ? null : (
                <>
                  <Box
                    sx={{
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
                </>
              )}
              <Box component="span" sx={{ display: "inline" }}>
                <Typography variant="subtitle2" component="span">
                  {`${post.favorites} favorite${
                    post.favorites === 1 ? "" : "s"
                  }`}
                </Typography>
              </Box>
              <Box component="span" sx={{ display: "inline", mx: 0.5 }}>
                <Typography variant="subtitle2" component="span">
                  •
                </Typography>
              </Box>
              <Box component="span" sx={{ display: "inline" }}>
                <Typography variant="subtitle2" component="span">
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        action={
          variant === "User" && userOwnsPost() ? (
            <PostActionItem postId={post.postId} />
          ) : null
        }
      />
    </Box>
  );
}
PostPreview.propTypes = {
  variant: PropTypes.oneOf(["Home", "User"]),
};
PostPreview.defaultProps = {
  variant: "Home",
};

function PostPreviewThumbnail({ post }) {
  let src = null;
  if (post?.media?.photo) {
    src = post.media.photo;
  } else if (post?.media?.video?.source === "YOUTUBE") {
    src = `https://img.youtube.com/vi/${post.media.video.id}/sddefault.jpg`;
  }

  if (!src) {
    return null;
  }

  return (
    <Link href={`/p/${post.postId}/`}>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <img
          src={src}
          style={{
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
        />
      </Box>
    </Link>
  );
}

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
  );
}

function PostPreviewSkeleton() {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        sx={{ mb: 1 }}
      />
      <CardHeader
        sx={{
          m: 0,
          p: 0,
          WebkitAlignItems: "start",
        }}
        avatar={
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        }
        title={
          <Box>
            <Skeleton>
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
                Skeleton Title
              </Typography>
            </Skeleton>
            <Box>
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
                  <Skeleton>
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
                      Username
                    </Typography>
                  </Skeleton>
                </Box>
              </>
            </Box>
          </Box>
        }
      />
    </Box>
  );
}

export { PostPreview, PostPreviewSkeleton };
