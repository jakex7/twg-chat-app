import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { hasSubscription } from '@jumpn/utils-graphql';
import { HTTP_URL, SOCKET_URL } from '@env';
import { getToken } from './util';
import AsyncParamsPhoenixSocket from './socket';

const phoenixSocket = new AsyncParamsPhoenixSocket(SOCKET_URL, {
  params: async () => {
    const token = await getToken();
    return { token: `${token}` };
  },
});
const absintheSocket = AbsintheSocket.create(phoenixSocket);
const wsLink = createAbsintheSocketLink(absintheSocket);

const httpLink = new HttpLink({
  uri: HTTP_URL,
});

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
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
