import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPasswordToken } from "../features/auth/authSlice";
const emailSchema = yup.object({
  email: yup.string().email("Email Should be valid").required("Email required"),
});
const Forgotpassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
    },
  });
  return (
    <div className="py-5 bg-login" style={{ minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email <br /> to get reset password mail.
        </p>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-15"
        >
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={formik.handleChange("email")}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error text-center">
            {formik.touched.email && formik.errors.email}
          </div>

          <div>
            <div className="mt-3 d-flex justify-content-center flex-column gap-15  align-items-center">
              <button
                className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
                style={{ background: "blue" }}
                type="submit"
              >
                Submit
              </button>
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
