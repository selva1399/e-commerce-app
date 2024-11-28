import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config.js";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { Select } from "antd";

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  // Config
  const backend = config.backendUrl;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Handle Change Order Status
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${backend}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container">
        <div className="row dashboard m-3 p-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="container" key={i}>
                  <div className="row flex-row card">
                    <div className="border shadow">
                      <table
                        className="table"
                        style={{
                          tableLayout: "fixed",
                          width: "100%",
                          wordBreak: "break-word",
                        }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th>{i + 1}</th>
                            <td>
                              <Select
                                style={{ width: "100%", fontWeight: "bold" }}
                                onChange={(value) => {
                                  handleChange(o._id, value);
                                }}
                                defaultValue={o?.status}
                                placeholder="Select a category"
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                options={status.map((s) => ({
                                  value: s,
                                  label: s,
                                }))}
                              />
                            </td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                            <td>{o?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="container">
                        {o?.products?.map((p, i) => (
                          <div
                            className="row flex-row card mb-2 p-3 "
                            key={p._id}
                          >
                            <div className="col-md-4">
                              <img
                                src={`${backend}/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top mt-2"
                                alt={p.name}
                                style={{
                                  width: "100%",
                                  height: "150px",
                                  objectFit: "fill",
                                }}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="flex-row">
                                <p>Name : {p.name}</p>
                                <p>Details :{p.description.substring(0, 30)}</p>
                                <p>Price : ₹ {p.price}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
