import { getCompany } from "./db/companies.js";
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
    job: (_root, { id }) => getJob(id),
    company: (_root, { id }) => getCompany(id),
  },
  Company: {
    jobs: async (company) => getJobsByCompany(company.id),
  },
  Job: {
    company: async (job) => await getCompany(job.companyId),
    date: (job) => isIsoDate(job.createdAt),
  },
};

const isIsoDate = (value) => {
  return value.slice(0, "yyyy-mm-dd".length);
};
