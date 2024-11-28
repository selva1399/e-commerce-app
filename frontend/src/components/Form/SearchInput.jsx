import React from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./../../config.js";

const SearchInput = () => {
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  // Config
  const backend = config.backendUrl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="d-flex me-3" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2 rounded-4"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
      />
      <button className="btn btn-outline-secondary rounded-4" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
