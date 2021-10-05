const query = jest.fn();
const mutate = jest.fn().mockImplementation(() => ({
  data: {}
}));
const gql = jest.fn();

module.exports = {
  ApolloClient: jest.fn().mockImplementation(() => ({
    query,
    mutate,
  })),
  gql,
  query,
  mutate,
};
