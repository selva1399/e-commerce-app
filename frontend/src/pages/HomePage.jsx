import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import config from "./../config.js";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart.jsx";
import banner from "../assets/images/banner.jpg";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);

  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  // Config
  const backend = config.backendUrl;

  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backend}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.error("Something went wrong...!");
    }
  };

  // Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/category/get-category`
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category...!");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotal();
  }, []);

  // Handle Filter by Categories
  const handleFilter = (value, id) => {
    setChecked((prevChecked) => {
      if (value) {
        return [...prevChecked, id];
      } else {
        return prevChecked.filter((c) => c !== id);
      }
    });
  };

  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts();
  //   // eslint-disable-next-line
  // }, [checked.length, radio.length]);

  // useEffect(() => {
  //   if (checked.length > 0 || radio.length > 0) filterProduct();
  // }, [checked, radio]);

  //  Get Filtered Product

  const filterProduct = async () => {
    try {
      console.log("Filter payload:", { checked, radio });
      const { data } = await axios.post(
        `${backend}/api/v1/product/product-filters`,
        { checked, radio }
      );
      console.log("Filtered products:", data?.products);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backend}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* ===================> BANNER IMAGE <=============== */}
      <img
        src={banner}
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="container">
        <div className="row mt-3 home-page">
          <div className="col-md-3 filters">
            {/* ------------- Category Filter ------------- */}
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.length > 0 ? (
                categories.map((c) => (
                  <div key={c._id}>
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>

            {/* ------------ Price Filter ----------- */}
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-info text-white"
                onClick={() => window.location.reload()}
              >
                RESET
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* {JSON.stringify(checked, null, 4)} */}
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <div className="card d-flex flex-wrap">
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
                  </div>
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
                        className="btn btn-danger ms-1"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item added to cart...!");
                        }}
                      >
                        CART
                      </button>
                      <button
                        className="ms-1 btn btn-info text-white"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
