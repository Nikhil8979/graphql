import { getCompany } from "./db/companies.js";
import { getJob, getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },
  Job: {
    company: async (job) => await getCompany(job.companyId),
    date: (job) => isIsoDate(job.createdAt),
  },
};

const isIsoDate = (value) => {
  return value.slice(0, "yyyy-mm-dd".length);
};
