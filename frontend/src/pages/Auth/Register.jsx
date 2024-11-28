import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config.js";
import "../../styles/AuthStyle.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  //Navigate to the LOGIN PAGE
  const navigate = useNavigate();

  const backend = config.backendUrl;

  // Form Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.post(`${backend}/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });

      if (resp && resp.data.success) {
        toast.success(resp.data && resp.data.message);
        // navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        setAnswer("");
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  return (
    <Layout title={"Register - e-shopper"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              required
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your address"
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
              placeholder="What is your favorite sport?"
              required
            />
          </div>
          <button type="submit" className="mt-3 btn">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
