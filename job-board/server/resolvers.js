import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany, createJob } from "./db/jobs.js";
import { GraphQLError } from "graphql";
export const resolvers = {
  Query: {
    jobs: async () => {
      const jobs = await getJobs();
      return jobs;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw NotFoundError(`Job not found with the given id : ${id}`);
      }
      return job;
    },
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw NotFoundError(`Company not found with the given id : ${id}`);
      }
      return company;
    },
  },
  Mutation: {
    createJob: async (_root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i";
      console.log("compan mtutions ");
      return createJob({ companyId, title, description });
    },
  },
  Company: {
    jobs: async ({ id }) => {
      const company = await getJobsByCompany(id);
      if (!company) {
        throw NotFoundError(`Company not found with the given id : ${id}`);
      }
      return company;
    },
  },
  Job: {
    company: async (job) => await getCompany(job.companyId),
    date: (job) => isIsoDate(job.createdAt),
  },
};

const isIsoDate = (value) => {
  return value.slice(0, "yyyy-mm-dd".length);
};

const NotFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
};
