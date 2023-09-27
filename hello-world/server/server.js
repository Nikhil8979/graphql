import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const typeDefs = `#graphql

  schema {
    query:Query
  }
  type Query { 
     greeting: String,
     book: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => `Hello World`,
    book: () => `hello`,
  },
};

const info = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(info, {
  listen: { port: 9000 },
});

console.log(`Server ready at: ${url}`);
