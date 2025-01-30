import { useContext } from "react";
import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { ListPosts, ListPostsSkeleton } from "../Home/ListPosts";
import { AuthenticatorContext } from "../../Authenticator";

function Favorites() {
  const { user } = useContext(AuthenticatorContext);
  const { loading, error, data } = useQuery(
    gql`
      query {
        getMyFavorites {
          favoritedAt
          post {
            postId
            title
            createdAt
            shortDescription
            media {
              photo
              video {
                source
                id
              }
            }
            user {
              username
              initials
              picture
            }
            favorites
          }
        }
      }
    `,
    {
      context: {
        headers: {
          authorization: user?.token,
        },
      },
    }
  );

  return (
    <div>
      <main>
        <h1>My Favorites</h1>
        {error ? (
          <Box>An unexpected error occurred.</Box>
        ) : loading ? (
          <ListPostsSkeleton />
        ) : (
          <ListPosts
            posts={data.getMyFavorites.map(
              (favoritedPost) => favoritedPost.post
            )}
          />
        )}
      </main>
    </div>
  );
}

export { Favorites };
