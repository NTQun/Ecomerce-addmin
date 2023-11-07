import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { getAUser, updateUser } from "./../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { Select } from "antd";

const profileSchema = yup.object({
  firstname: yup.string().required("First Name required"),
  lastname: yup.string().required("Last Name required"),
  mobile: yup.string().required("Mobile No required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  role: yup.string().required("Role is Required"),
});
const roles = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Delivery", value: "delivery" },
];
const Editaccount = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getId = location.pathname.split("/")[3];

  const userState = useSelector((state) => state.auth.getAUser);
  useEffect(() => {
    dispatch(getAUser(getId));
  }, []);

  const [edit, setEdit] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      mobile: userState?.mobile,
      email: userState?.email,
      role: userState?.role,
    },
    validationSchema: profileSchema,

    onSubmit: (values) => {
      dispatch(updateUser({ data: values, id: getId }));
      setEdit(true);
    },
  });
  const defaultRole = userState?.role;
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="div d-flex justify-content-between align-items-center">
            <h3 className="my-3">Update Account</h3>
            <FiEdit className="fs-3" onClick={() => setEdit(false)} />
          </div>
        </div>
        <div className="col-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="example1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                className="form-control"
                disabled={edit}
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
              />
              <div className="error">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="example1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                className="form-control"
                disabled={edit}
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
              />
              <div className="error">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                disabled={edit}
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail2" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                name="mobile"
                className="form-control"
                disabled={edit}
                id="exampleInputEmail2"
                aria-describedby="emailHelp"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
              />
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail2" className="form-label">
                Role
              </label>
              <div className="mt-3">
                <Select
                  allowClear
                  className="w-100"
                  // placeholder="Select Role"
                  disabled={edit}
                  defaultValue={defaultRole}
                  name="role"
                  options={roles}
                  onChange={formik.handleChange("role")}
                />
              </div>
              <div className="error">
                {formik.touched.role && formik.errors.role}
              </div>
            </div>
            {edit === false && (
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Editaccount;
