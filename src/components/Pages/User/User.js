import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { Skeleton } from "@mui/material";
import { UserView } from "./UserView";

function User() {
  const { username } = useRouter().query;

  if (!username) {
    return (
      <div>
        <main>
          <div>User not found.</div>
        </main>
      </div>
    );
  }

  return <UserContainer username={username} />;
}

function UserContainer({ username }) {
  const { loading, error, data } = useQuery(
    gql`
      query ($username: String!) {
        getUserByUsername(username: $username) {
          username
        }
      }
    `,
    { variables: { username } }
  );

  if (error) {
    return (
      <div>
        <main>
          <div>An unexpected error occurred.</div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <main>
          <Skeleton height={100} />
          <Skeleton />
          <Skeleton />
        </main>
      </div>
    );
  }

  if (!data.getUserByUsername) {
    return (
      <div>
        <main>
          <div>User not found.</div>
        </main>
      </div>
    );
  }

  return <UserView user={data.getUserByUsername} />;
}

export { User };
