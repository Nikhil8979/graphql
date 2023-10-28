import { useState } from "react";
import JobList from "../components/JobList";
import { useJobs } from "../lib/graphql/hooks";

const JOB_PER_PAGE = 10;
function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { error, loading, jobs } = useJobs(
    JOB_PER_PAGE,
    (currentPage - 1) * JOB_PER_PAGE
  );
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }
  const totalPages = Math.ceil(jobs.totalCount / JOB_PER_PAGE);
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((currentPage) => currentPage - 1)}
      >
        Previous
      </button>
      <span>{`${currentPage} of ${totalPages}`}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((currentPage) => currentPage + 1)}
      >
        Next
      </button>
      <JobList jobs={jobs?.items} />
    </div>
  );
}

export default HomePage;
