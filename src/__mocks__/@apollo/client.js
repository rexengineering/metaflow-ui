const query = jest.fn();
const mutate = jest.fn().mockImplementation(() => ({
  data: {}
}));
const gql = jest.fn();
const subscribe = () => ({
  subscribe: () => {},
});

module.exports = {
  ApolloClient: jest.fn().mockImplementation(() => ({
    query,
    mutate,
    subscribe
  })),
  HttpLink: jest.fn(),
  split: jest.fn(),
  InMemoryCache: jest.fn(),
  gql,
  query,
  mutate,
  subscribe,
};
