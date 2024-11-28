import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="container-fluid">
      {/* <h3 className="pb-3">Category Form</h3> */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
