import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import config from "../../config.js";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  // Config
  const backend = config.backendUrl;

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container">
        <div className="row dashboard mb-3 m-3 p-3">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="container" key={i}>
                  <div className="row flex-row card">
                    <div className="border shadow">
                      <table className="table">
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
                            <td>{o?.status}</td>
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
                                className="card-img-top"
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
                                <p>
                                  Details : {p.description.substring(0, 30)}
                                </p>
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

export default Orders;
