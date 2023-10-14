import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginDelivery } from "./../features/delivery/deliverySlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const LoginDelivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(loginDelivery(values));
    },
  });
  const authState = useSelector((state) => state?.delivery);
  const { delivery, isError, isSuccess, isLoading, message } = authState;
  useEffect(() => {
    if (isSuccess) {
      navigate("/delivery/order");
    } else {
      navigate("/deliver");
    }
  }, [delivery, isError, isSuccess, isLoading, message]);
  return (
    <div className="py-5 bg-login" style={{ minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login Delivery</h3>
        <p className="text-center">Login to your account to continue.</p>
        {/* <div className="error text-center">
          {message.message == "Rejected" ? "You are not an Delivery" : ""}
        </div> */}
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={formik.handleChange("password")}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2">
            {formik.touched.password && formik.errors.password}
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "blue" }}
            type="submit"
          >
            Login
          </button>
          <Link to="/" className="text-center title mt-3 text-danger">
            Login Admin
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginDelivery;
