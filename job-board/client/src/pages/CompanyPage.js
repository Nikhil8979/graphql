import { useParams } from "react-router";
import JobList from "../components/JobList";
import { useCompany } from "../lib/graphql/hooks";

function CompanyPage() {
  const { companyId } = useParams();
  const { error, loading, company } = useCompany(companyId);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  return (
    <div>
      <h1 className="title">{company?.name}</h1>
      <div className="box">{company?.description}</div>
      <h2 className="title is-5">Jobs At {company?.name}</h2>
      <JobList jobs={company?.jobs} />
    </div>
  );
}

export default CompanyPage;
