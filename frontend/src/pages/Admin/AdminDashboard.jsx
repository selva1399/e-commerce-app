import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Admin"}>
      <div className="container">
        <div className="row m-3 p-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card m-5 p-3">
              <h3>
                Name: <span className="fs-5">{auth?.user?.name}</span>
              </h3>
              <h3>
                Email : <span className="fs-5">{auth?.user?.email}</span>
              </h3>
              <h3>
                Contact: <span className="fs-5">{auth?.user?.phone}</span>
              </h3>
              <h3>
                Address: -{" "}
                <p className="fs-5 mt- ms-2 lh-base">{auth?.user?.address}</p>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
