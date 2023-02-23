import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { createColors } from "../features/color/colorSlice";
let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});
const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor } = newColor;
  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor]);
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createColors(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/list-color");
      }, 1000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
