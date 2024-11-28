import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.js";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Payment process
  //Token
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  // Config
  const backend = config.backendUrl;

  // Cart total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // ==================> Get Payment Gateway <================= //

  // Token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${backend}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello, Guest!"
                : `Hello,  ${auth?.token && auth?.user?.name} 🖐️`}
              <p className="text-center">
                {cart?.length > 0
                  ? `You have ${cart.length} item${
                      cart.length > 1 ? "s" : ""
                    } in your cart ${
                      auth?.token ? "" : "Please login to checkout!"
                    }`
                  : "Your Cart Is Empty!"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container mt-2">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="container" key={p._id}>
                  <div className="row flex-row card mb-2">
                    <div className="col-md-4">
                      <img
                        src={`${backend}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top p-3"
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "130px",
                          objectFit: "fill",
                        }}
                      />
                    </div>
                    <div className="col-md-4 mt-3">
                      <p>Product Name: {p.name}</p>
                      <p>Product Deatils: {p.description.substring(0, 30)}</p>
                      <p className="fw-bold">Price : ₹ {p.price}</p>
                      {/* </div>
                    <div className="col-md-4 cart-remove-btn"> */}
                      <button
                        className="btn btn-danger mb-3"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h3 className="mb-3 fw-bold">Total : {totalPrice()}</h3>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h3>Current Address :</h3>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-2">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2 ms-4 me-4">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary rounded-4 mt-2 mb-4"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing...." : "Make Payment"}
                    </button>
                  </>
                )}

                {/* {clientToken && clientToken ? (
              <div>
                <DropIn
                  options={{ authorization: clientToken }}
                  onInstance={(instance) => setInstance(instance)}
                />
                <button onClick={handlePayment}>Buy</button>
              </div>
            ) : (
              <div>
                <h1>Loading...</h1>
              </div>
            )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
