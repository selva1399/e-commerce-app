import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contact from "../assets/images/contact.jpg";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div className="col-md-6 ">
          <img
            src={contact}
            alt="contactus"
            style={{ width: "100%", height: "480px", objectFit: "fill" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-info rounded-4 p-2 text-white text-center mb-5">
            CONTACT US
          </h1>
          {/* <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p> */}
          <p className="mt-3">
            <BiMailSend /> : admin-e-shopper@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 98765 43210
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
