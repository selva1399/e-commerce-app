import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found - Go Back"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="btn btn-outline-info mt-4 p-2 ">
          {" "}
          Go Back{" "}
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
