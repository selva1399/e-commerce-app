import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import config from "./../../config.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Config
  const backend = config.backendUrl;

  // Get All Products

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  // Life Cycle Method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Produts List"}>
      <div className="container">
        <div className="row dashboard m-3 p-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products List</h1>
            <div className="container">
              <div className="d-flex flex-wrap p-1">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="product-link"
                  >
                    <div className="card m-2" style={{ width: "15rem" }}>
                      <div className="card d-flex flex-wrap p-1">
                        <img
                          src={`${backend}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{
                            width: "100%",
                            height: "10rem",
                            objectFit: "fill",
                          }}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
