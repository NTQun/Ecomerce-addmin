import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { createUser } from "../features/auth/authSlice";

let schema = yup.object().shape({
  firstname: yup.string().required("firstname is Required"),
  lastname: yup.string().required("lastname is Required"),
  email: yup.string().required("email is Required"),
  mobile: yup.string().required("mobile is Required"),
  password: yup.string().required("password is Required"),
  confirmpassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  role: yup.string().required("Role is Required"),
});
const Editaccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
    { label: "Manager", value: "manager" },
    { label: "Delivery", value: "delivery" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      role: "",
      confirmpassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createUser(values));
      console.log(values);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Manager</h3>
      <button onClick={() => navigate("/admin/list-manager")}>
        <AiOutlineDoubleLeft /> Manager list
      </button>
      <div className="">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-15"
        >
          <CustomInput
            type="text"
            name="firstname"
            label="First name"
            val={formik.values.firstname}
            onChng={formik.handleChange("firstname")}
            onBlur={formik.handleBlur("firstname")}
          />
          <div className="error">
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <CustomInput
            type="text"
            name="lastname"
            label="Last name"
            val={formik.values.lastname}
            onChng={formik.handleChange("lastname")}
            onBlur={formik.handleBlur("lastname")}
          />
          <div className="error">
            {formik.touched.lastname && formik.errors.lastname}
          </div>
          <CustomInput
            type="email"
            name="email"
            label="Email"
            val={formik.values.email}
            onChng={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="tel"
            name="mobile"
            label="Mobile Number"
            val={formik.values.mobile}
            onChng={formik.handleChange("mobile")}
            onBlur={formik.handleBlur("mobile")}
          />
          <div className="error">
            {formik.touched.mobile && formik.errors.mobile}
          </div>

          <div className="mt-3">
            <Select
              allowClear
              className="w-100"
              placeholder="Select Role"
              name="role"
              options={roles}
              onChange={formik.handleChange("role")}
            />
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            val={formik.values.password}
            onChng={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <CustomInput
            type="password"
            label="Confirm Password"
            id="pass"
            name="confirmpassword"
            onChng={formik.handleChange("confirmpassword")}
            onBlr={formik.handleBlur("confirmpassword")}
            val={formik.values.confirmpassword}
          />
          <div className="error mt-2">
            {formik.touched.confirmpassword && formik.errors.confirmpassword}
          </div>
          <div>
            <div className=" mt-2">
              <button
                className="btn btn-success border-0 rounded-3 my-5"
                type="submit"
              >
                Add Manager Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editaccount;
