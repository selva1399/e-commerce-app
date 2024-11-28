import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <p className="text-center mt-3 mb-3">
        <Link to="/about">About</Link> | <Link to="/contact">Contact </Link>
        {/* <Link to="/policy">Privacy Policy</Link> */}
      </p>
      <h4 className="text-center mt-3">e-shopper &copy; {year} </h4>
    </div>
  );
};

export default Footer;
