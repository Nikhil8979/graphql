import { GraphQLClient, gql } from "graphql-request";
const client = new GraphQLClient("http://localhost:9000/graphqlv1");

export const getJobs = async () => {
  const query = gql`
    query {
      jobs {
        id
        description
        title
        company {
          id
          name
        }
        date
      }
    }
  `;

  const { jobs } = await client.request(query);
  return jobs;
};
