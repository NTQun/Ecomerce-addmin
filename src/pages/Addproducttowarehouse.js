import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, importProduct } from "../features/product/productSlice";
import { AiFillFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
let schema = yup.object().shape({
  importprice: yup.number().required("Price is Required"),
  price: yup.number().required("Price is Required"),

  quantity: yup.number().required("Quantity is Required"),
});
const Addproducttowarehouse = () => {
  const dispatch = useDispatch();
  const warehouesState = useSelector((state) => state.product.warehouse);
  const [id, setId] = useState(null);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
        <div className="row  py-3" style={{ backgroundColor: "#2b4663" }}>
          <div className="col-4">
            <h6 className="text-white">Product Name </h6>
          </div>
          <div className="col-1">
            <h6 className="text-white">Category</h6>
          </div>
          <div className="col-1">
            <h6 className="text-white">Brand</h6>
          </div>
          <div className="col-1">
            <h6 className="text-white">Tags</h6>
          </div>
          <div className="col-1">
            <h6 className="text-white">Import Price</h6>
          </div>{" "}
          <div className="col-1">
            <h6 className="text-white">Price</h6>
          </div>{" "}
          <div className="col-1">
            <h6 className="text-white">Quantity</h6>
          </div>
          <div className="col-1">
            <h6 className="text-white">Action</h6>
          </div>
        </div>
        {warehouesState &&
          warehouesState?.map((item, index) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div
                  className="row  py-3 "
                  style={{ backgroundColor: "#192e45" }}
                  key={index}
                >
                  <div className="col-4">
                    <p className="text-white">{item?.product.title} </p>
                  </div>
                  <div className="col-1">
                    <p className="text-white ">{item?.product.category} </p>
                  </div>
                  <div className="col-1">
                    <p className="text-white">{item?.product.brand} </p>
                  </div>
                  <div className="col-1">
                    <p className="text-white">{item?.product.tags} </p>
                  </div>
                  <div className="col-1 px-2 ">
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      name="importprice"
                      onChange={formik.handleChange("importprice")}
                      onBlur={formik.handleBlur("importprice")}
                      value={formik.values.importprice}
                    />
                  </div>
                  <div className="col-1 ">
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      name="price"
                      onChange={formik.handleChange("price")}
                      onBlur={formik.handleBlur("price")}
                      value={formik.values.price}
                    />
                  </div>
                  <div className="col-1 ">
                    <input
                      type="number"
                      style={{ width: "100px" }}
                      name="quantity"
                      onChange={formik.handleChange("quantity")}
                      onBlur={formik.handleBlur("quantity")}
                      value={formik.values.quantity}
                    />
                  </div>

                  <div className="col-2  ">
                    <button
                      className=" ms-3 text-success"
                      type="submit"
                      onClick={(e) => setId(item._id)}
                    >
                      <AiFillFileAdd />
                    </button>
                  </div>
                </div>
              </form>
            );
          })}
      </div>
    </div>
  );
};

export default Addproducttowarehouse;
