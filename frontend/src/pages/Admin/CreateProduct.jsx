import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import config from "./../../config.js";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  // Config
  const backend = config.backendUrl;

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
  }, []);

  // Create Product Function

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      const { data } = await axios.post(
        `${backend}/api/v1/product/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product created successfully...!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container">
        <div className="row m-3 p-3 dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container">
              <h1 className="ms-3">Create Product</h1>
              <div className="p-3 mt-3 w-75">
                <Select
                  showSearch
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                  }}
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  placeholder="Select a category"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={categories.map((c) => ({
                    value: c._id,
                    label: c.name,
                  }))}
                />

                <div className="mt-4 mb-3">
                  <label className="btn btn-outline-primary col-md-6 p-2">
                    {photo ? photo.name : "Upload photo"}
                    <input
                      className="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                      name="Photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-start">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product-Photo"
                        style={{ height: "100px", width: "100px" }}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    placeholder="Write a name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: 75 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      if (description.trim() === "") {
                        setIsFocused(false);
                      }
                    }}
                  />
                  {!isFocused && description.trim() === "" && (
                    <label htmlFor="floatingTextarea2">
                      Write a description
                    </label>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    placeholder="Write a price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    placeholder="Write a quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    style={{ width: "100%", fontWeight: "bold" }}
                    placeholder="Select shipping"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "0",
                        label: "Yes",
                      },
                      {
                        value: "1",
                        label: "No",
                      },
                    ]}
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
