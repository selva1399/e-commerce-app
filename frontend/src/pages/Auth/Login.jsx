import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import config from "../../config.js";
import "../../styles/AuthStyle.css";
import { useAuth } from "../../context/Auth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  //Navigate to the LOGIN PAGE
  const navigate = useNavigate();
  const location = useLocation();

  const backend = config.backendUrl;

  // Form Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.post(`${backend}/api/v1/auth/login`, {
        email,
        password,
      });

      if (resp && resp.data.success) {
        setAuth({
          ...auth,
          user: resp.data.user,
          token: resp.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(resp.data));
        navigate(location.state || "/");
        toast.success(resp.data && resp.data.message);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  return (
    <Layout title={"Login - e-shopper"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-inline-flex">
            <button type="submit" className="mt-3 btn">
              LOGIN
            </button>
          </div>

          <Link
            // type="submit"
            className="ms-3 forgot-btn"
            to="/forgot-password"
            // onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
