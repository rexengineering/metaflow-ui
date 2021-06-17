const query = jest.fn();
const mutation = jest.fn();
const gql = jest.fn();

module.exports = {
  ApolloClient: jest.fn().mockImplementation(() => ({
    query,
    mutation,
  })),
  gql,
  query,
  mutation,
};
