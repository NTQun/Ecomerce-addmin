import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../features/pcategory/pcategorySlice";
import { ToastContainer, toast } from "react-toastify";
let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, createdCategory } = newCategory;
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-category");
      }, 2500);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
