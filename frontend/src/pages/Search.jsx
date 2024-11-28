import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import config from "../config.js";

const Search = () => {
  const [values, setValues] = useSearch();

  // config
  const backend = config.backendUrl;

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" key={p._id} style={{ width: "18rem" }}>
                <img
                  src={`${backend}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "fill",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹ {p.price}</p>
                  <button className="btn btn-danger ms-1">CART</button>
                  <button className="btn btn-info ms-1 ">More Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
