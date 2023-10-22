import React from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { resetPassword } from "../features/auth/authSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is required"),
});
const Resetpassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token: getToken, password: values.password }));

      navigate("/");
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
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <CustomInput
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            values={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
