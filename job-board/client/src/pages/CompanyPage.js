import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getCompany } from "../lib/graphql/queries";
import JobList from "../components/JobList";

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company: null,
    error: false,
    loading: true,
  });
  useEffect(() => {
    if (companyId) {
      (async () => {
        try {
          const company = await getCompany(companyId);
          setState({ company, loading: false, error: false });
        } catch (error) {
          setState({ company: null, loading: false, error: true });
        }
      })();
    }
  }, [companyId]);
  const { loading, error, company } = state;
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
