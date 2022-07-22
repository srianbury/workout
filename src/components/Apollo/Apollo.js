import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_ORIGIN}/api/graphql`,
  cache: new InMemoryCache(),
});

function Apollo({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export { Apollo };
