import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import config from "../config.js";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart.jsx";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [releatedProducts, setReleatedProducts] = useState([]);

  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();

  // Config
  const backend = config.backendUrl;

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/product/releated-product/${pid}/${cid}`
      );
      setReleatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row product-details">
          <div className="col-md-6">
            <img
              src={`${backend}/api/v1/product/product-photo/${product._id}`}
              className="card-img-top rounded-5"
              alt={product.name}
              style={{
                width: "100%",
                height: "350px",
              }}
            />
          </div>
          <div className="col-md-6 product-details-info">
            <h1 className="text-center mt-2">Product Details</h1>
            <hr />
            <h6>Name: {product.name}</h6>
            <h6>Details: {product.description}</h6>
            <h6>
              Price :{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h6>
            <h6>Category: {product?.category?.name}</h6>
            <button
              className="btn btn-danger w-25 ms-1"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item added to cart...!");
              }}
            >
              CART
            </button>
          </div>
        </div>
        <hr />

        <div className="row container similar-products mb-3">
          <h4>Similar Products ➡️</h4>
          {releatedProducts.length < 1 && (
            <p className="text-center">No similar products found.</p>
          )}
          <div className="d-flex flex-wrap">
            {releatedProducts?.map((p) => (
              <div className="card m-2" key={p._id}>
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
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>

                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1 text-white"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
