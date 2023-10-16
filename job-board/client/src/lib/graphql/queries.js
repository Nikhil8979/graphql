import {
  gql,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { getAccessToken } from "../auth";

const httpLink = createHttpLink({ uri: "http://localhost:9000/graphqlv1" });
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});
const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});
export const createJob = async ({ title, description }) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: {
      input: { title, description },
    },
  });
  return data.job;
};
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

  const { data } = await apolloClient.query({ query });
  return data.jobs;
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
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.job;
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
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.company;
};
