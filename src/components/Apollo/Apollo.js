import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function Apollo({ children }) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URI,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export { Apollo };
