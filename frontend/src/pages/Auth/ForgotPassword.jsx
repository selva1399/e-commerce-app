import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";
import "../../styles/AuthStyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  //Navigate to the LOGIN PAGE
  const navigate = useNavigate();

  const backend = config.backendUrl;

  // Form Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.post(`${backend}/api/v1/auth/forgot-password`, {
        email,
        answer,
        newPassword,
      });

      if (resp && resp.data.success) {
        toast.success(resp.data && resp.data.message);
        // navigate("/login");
        setEmail("");
        setNewPassword("");
        setAnswer("");
      } else {
        toast.error(resp.data.message);
      }

      //   console.log(email, answer, newPassword);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  return (
    <Layout title={"Forgot Password - e-shopper"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputNewPassword"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer"
              placeholder="Enter your favorite sport name"
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="mt-3 btn">
              RESET
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
