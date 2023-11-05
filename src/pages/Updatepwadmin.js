import React from "react";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updatepw } from "../features/auth/authSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is required"),
});
const Updatepwdelivery = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values) => {
      dispatch(updatepw(values));
      formik.resetForm();
    },
  });
  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center mb-3">Reset Password</h3>
          <form
            action=""
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-15"
          >
            <CustomInput
              type="password"
              label="new Password"
              id="pass"
              name="password"
              onChng={formik.handleChange("password")}
              onBlr={formik.handleBlur("password")}
              val={formik.values.password}
            />
            <div className="error mt-2">
              {formik.touched.password && formik.errors.password}
            </div>
            <div>
              <div className="mt-3 d-flex justify-content-center gap-15  align-items-center ">
                <button
                  className="button bg-success text-white p-3"
                  type="submit"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Updatepwdelivery;
