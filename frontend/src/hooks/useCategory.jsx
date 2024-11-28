import { useState, useEffect } from "react";
import axios from "axios";
import config from "./../config.js";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // Config
  const backend = config.backendUrl;

  // Get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
