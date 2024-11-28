import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import config from "./../../config.js";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  // Config
  const backend = config.backendUrl;

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backend}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category...!");
    }
  };

  useEffect(() => {
    getSingleProduct();

    // eslint-disable-next-line
  }, []);

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

  // Update Product Function

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `${backend}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        // navigate("/dashboard/admin/products");
        toast.success("Product updated successfully...!");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  // Delete Product Function

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${backend}/api/v1/product/delete-product/${id}`
      );

      if (data?.success) {
        toast.success(`${data?.message}`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...!");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container">
        <div className="row m-3 p-3 ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container">
              <h1 className="ms-3">Update Product</h1>
              <div className="p-3 mt-3 w-75">
                <Select
                  showSearch
                  style={{ width: "100%", fontWeight: "bold" }}
                  value={category}
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
                  <label className="btn btn-outline-primary col-md-6">
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
                  {photo ? (
                    <div className="text-start">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product-Photo"
                        style={{ height: "100px", width: "100px" }}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-start">
                      <img
                        src={`${backend}/api/v1/product/product-photo/${id}`}
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
                    value={shipping ? "No" : "Yes"}
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
                    onClick={handleUpdate}
                  >
                    Update
                  </button>

                  {/* Button trigger modal */}
                  <button
                    type="button"
                    className="btn btn-danger ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Delete
                  </button>
                </div>
                {/* Modal */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="modal-title fs-5" id="exampleModalLabel">
                          Delete Product!
                        </h2>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <h5>Do you want to delete this product?</h5>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleDelete}
                          data-bs-dismiss="modal"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
