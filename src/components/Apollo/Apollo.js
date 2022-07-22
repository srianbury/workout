import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function Apollo({ children }) {
  const client = new ApolloClient({
    uri:
      typeof window === "undefined"
        ? null
        : `${window.location.origin}/api/graphql`,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export { Apollo };
