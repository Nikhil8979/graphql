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

export const getJob = async (id) => {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        description
        title
        date
        company {
          id
          name
        }
      }
    }
  `;
  const { job } = await client.request(query, { id });
  return job;
};

export const getCompany = async (id) => {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const { company } = await client.request(query, { id });
  return company;
};
