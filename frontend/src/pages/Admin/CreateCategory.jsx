import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import config from "./../../config.js";
import CategoryForm from "../../components/Form/CategoryForm.jsx";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Config
  const backend = config.backendUrl;

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backend}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in input form...!");
    }
  };

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

  // Update Category
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `${backend}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data.success) {
        toast.success(`${updatedName} is updated...!`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in update category...!");
    }
  };

  // Delete Category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${backend}/api/v1/category/delete-category/${pId}`
      );

      if (data.success) {
        toast.success("Category is deleted...!");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in delete category...!");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container">
        <div className="row dashboard m-3 p-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container">
              <h1 className="ms-3">Manage Category</h1>
              <div className="pt-4 pb-3 w-50">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div className="w-75 m-3">
                <table className="table table-info border border-dark">
                  <thead>
                    <tr>
                      <th scope="col">Category Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => {
                      return (
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary me-1"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                open={visible}
              >
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
