import { useMutation, useQuery } from "@apollo/client";
import {
  companyByIdQuery,
  createJobMutation,
  jobByIdQuery,
  jobsQuery,
} from "./queries";

export const useCompany = (companyId) => {
  const { error, loading, data } = useQuery(companyByIdQuery, {
    variables: { id: companyId },
  });
  return { error: Boolean(error), loading, company: data?.company };
};

export const useJob = (jobId) => {
  const { error, loading, data } = useQuery(jobByIdQuery, {
    variables: { id: jobId },
  });
  return { error: Boolean(error), loading, job: data?.job };
};

export const useJobs = (limit, offset) => {
  const { error, loading, data } = useQuery(jobsQuery, {
    variables: {
      limit,
      offset,
    },
    fetchPolicy: "network-only",
  });
  console.log(data, "-- data ");
  return { error: Boolean(error), loading, jobs: data?.jobs };
};

export const useCreateJob = () => {
  const [mutate, { loading }] = useMutation(createJobMutation);
  const createJob = async (title, description) => {
    const {
      data: { job },
    } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: {
            id: data.job.id,
          },
          data,
        });
      },
    });

    return job;
  };
  return { loading, createJob };
};
