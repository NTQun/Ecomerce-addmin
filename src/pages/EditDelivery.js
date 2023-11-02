import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";

let schema = yup.object().shape({
  name: yup.string().required("Coupon Name is Required"),
  expiry: yup.date().required("Expiry Date is Required"),
  discount: yup.number().required("Discount Percentage is Required"),
});
function Editdelivery() {
  const dispatch = useDispatch();
  const location = useLocation();
  const getCouponId = location.pathname.split("/")[3];
  const getCoupon = useSelector((state) => state?.coupon.getACoupon);
  const formData = [];
  if (getCoupon !== undefined) {
    Object.keys(getCoupon).forEach((key) => {
      if (key === "name" || key === "expiry" || key === "discount") {
        formData.push(getCoupon[key]);
      }
    });
  }

  const [name, expiry, discount] = formData;
  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year, day, month].join("-");
  };
  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name,
      expiry: changeDateFormet(expiry),
      discount: discount,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getCouponId, couponData: values };
      dispatch(updateACoupon(data));
      toast.success("Update coupon success");
      formik.resetForm();
      dispatch(resetState());
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Update Coupon</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            label="Enter Coupon Name"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            label="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            value={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Update Coupon
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editdelivery;
