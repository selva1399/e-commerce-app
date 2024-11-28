import React from "react";
import Layout from "../components/Layout/Layout";
import about from "../assets/images/about.jpeg";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="row contactus">
        <div className="col-md-6 ">
          <img src={about} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <div className="text-justify mt-2">
            <h4>Welcome to E - SHOPPER! 🛍️</h4>
            <p className="text-justify">
              {" "}
              At E - SHOPPER, we believe that shopping should be simple,
              enjoyable, and accessible to everyone. As a modern, customer-first
              e-commerce platform, we specialize in providing high-quality
              fashion apparel that suits every style, occasion, and personality.
              Whether you're looking for trendy pieces, timeless classics, or
              something in between, E - SHOPPER is your go-to destination for
              all things fashion.
            </p>
            <h4>Our Mission 🚀</h4>
            <p>
              To revolutionize online shopping by blending technology and
              customer-centric service, making every purchase smooth, secure,
              and satisfying.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
