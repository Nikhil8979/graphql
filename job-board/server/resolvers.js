import { getJobs } from "./db/jobs.js";

export const resolvers = {
  Query: {
    jobs: () => getJobs(),
  },
  Job: {
    date: (job) => isIsoDate(job.createdAt),
  },
};

const isIsoDate = (value) => {
  return value.slice(0, "yyyy-mm-dd".length);
};
