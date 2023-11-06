import React, { useEffect, useState } from "react";
// import { BiEdit } from "react-icons/bi";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  getAWarehouse,
  getProducts,
  importProduct,
} from "../features/product/productSlice";
// import { Link, useNavigate } from "react-router-dom";
import { AiFillFileAdd, AiOutlineDoubleLeft } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  importprice: yup.number().required("Price is Required"),
  price: yup.number().required("Price is Required"),

  quantity: yup.number().required("Quantity is Required"),
});
const Importwarehouse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const warehouesState = useSelector((state) => state.product.awarehouse);
  useEffect(() => {
    dispatch(getAWarehouse(id));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      importprice: "",
      price: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: id, data: values };
      dispatch(importProduct(data));
    },
  });
  console.log(id);
  return (
    <div>
      <div className="col-12">
        <div className="mb-3">
          {" "}
          <button
            className="bg-success"
            onClick={() => navigate("/admin/list-warehoue")}
          >
            <AiOutlineDoubleLeft /> Warehouse list
          </button>
        </div>
        <div className="row  py-3" style={{ backgroundColor: "#2b4663" }}>
          <div className="col-3 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Product Name </h6>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Category</h6>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Brand</h6>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Tags</h6>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Import Price</h6>
          </div>{" "}
          <div className="col-1 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Price</h6>
          </div>{" "}
          <div className="col-1 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Quantity</h6>
          </div>
          <div className="col-1 d-flex align-items-center justify-content-center">
            <h6 className="text-white">Action</h6>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="row  py-3 " style={{ backgroundColor: "#192e45" }}>
            <div className="col-3 border d-flex align-items-center justify-content-center">
              <p className="text-white">{warehouesState?.product.title} </p>
            </div>
            <div className="col-1 border d-flex align-items-center justify-content-center">
              <p className="text-white ">{warehouesState?.product.category} </p>
            </div>
            <div className="col-2 border d-flex align-items-center justify-content-center">
              <p className="text-white">{warehouesState?.product.brand} </p>
            </div>
            <div className="col-1 border d-flex align-items-center justify-content-center">
              <p className="text-white">{warehouesState?.product.tags} </p>
            </div>
            <div className="col-1 px-2 ">
              <input
                type="number"
                style={{ width: "80px", height: "40px" }}
                name="importprice"
                onChange={formik.handleChange("importprice")}
                onBlur={formik.handleBlur("importprice")}
                value={formik.values.importprice}
              />
            </div>
            <div className="col-1 ">
              <input
                type="number"
                style={{ width: "80px", height: "40px" }}
                name="price"
                onChange={formik.handleChange("price")}
                onBlur={formik.handleBlur("price")}
                value={formik.values.price}
              />
            </div>
            <div className="col-1 ">
              <input
                type="number"
                style={{ width: "80px", height: "40px" }}
                name="quantity"
                onChange={formik.handleChange("quantity")}
                onBlur={formik.handleBlur("quantity")}
                value={formik.values.quantity}
              />
            </div>

            <div className="col-2  ">
              <button
                className=" ms-3 bg-success text-white"
                type="submit"
                style={{ height: "40px" }}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Importwarehouse;
