import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Socket as PhoenixSocket } from 'phoenix';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { hasSubscription } from '@jumpn/utils-graphql';
import { AUTH_TOKEN, HTTP_URL, SOCKET_URL } from '@env';

const phoenixSocket = new PhoenixSocket(SOCKET_URL, {
  params: () => ({ token: `${AUTH_TOKEN}` }),
});
const absintheSocket = AbsintheSocket.create(phoenixSocket);
const wsLink = createAbsintheSocketLink(absintheSocket);

const httpLink = new HttpLink({
  uri: HTTP_URL,
});
const authLink = setContext((_, { headers }) => {
  const token = AUTH_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const authedHttpLink = authLink.concat(httpLink);

export const client = new ApolloClient({
  link: split(
    (operation) => hasSubscription(operation.query),
    wsLink,
    authedHttpLink
  ),
  cache: new InMemoryCache(),
});
