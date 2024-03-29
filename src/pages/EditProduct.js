import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import {
  delImg,
  resetStateUploade,
  uploadImg,
} from "../features/upload/uploadSlice";
import {
  getProduct,
  resetState,
  updateProduct,
} from "../features/product/productSlice";
import { AiOutlineDoubleLeft } from "react-icons/ai";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  images: yup.array(),
});

const Editproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const location = useLocation();
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload);
  const getProductId = location.pathname.split("/")[3];
  const productState = useSelector((state) => state.product.product);
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    dispatch(getProduct(getProductId));
  }, []);

  const formData = [];
  if (productState !== undefined) {
    Object.keys(productState).forEach((key) => {
      if (
        key === "title" ||
        key === "description" ||
        key === "category" ||
        key === "brand" ||
        key === "tags" ||
        key === "color" ||
        key === "images"
      ) {
        formData.push(productState[key]);
      }
    });
  }
  const [title, description, brand, category, imagess, colors, tags] = formData;
  console.log(formData);
  const defaultImg = [];
  imagess?.map((item) =>
    defaultImg.push({ public_id: item?.public_id, url: item?.url })
  );
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  const defautColor = [];
  colors?.map((item) => defautColor.push(item.title));
  const img = [];
  imgState.images.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.color = color ? color : defautColor;
  }, [color, imgState.isSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
      description: description,
      brand: brand,
      category: category,
      tags: tags,
      color: colors,
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data1 = { id: getProductId, productData: values, image: img };
      const data2 = {
        id: getProductId,
        productData: values,
        image: defaultImg,
      };
      if (imgState.isSuccess) {
        console.log("new img");
        dispatch(updateProduct(data1));
      } else {
        console.log("old img");
        dispatch(updateProduct(data2));
      }
      dispatch(resetState());
      dispatch(resetStateUploade());
      formik.resetForm();
      setTimeout(() => {
        window.history.back();
      }, 1000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Update Product</h3>
      <button onClick={() => window.history.back()}>
        <AiOutlineDoubleLeft /> Back
      </button>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              defaultValue={description}
              theme="snow"
              placeholder="Enter Product Description"
              name="description"
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <select
            name="brand"
            defaultValue={brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control "
            id=""
          >
            <option value="">{brand}</option>
            {brandState.map((i, j) => {
              return (
                <option defaultValue={brand} key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            defaultValue={category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control "
            id=""
          >
            <option value="">{category}</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control "
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={defautColor}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showimages d-flex flex-wrap gap-3">
            {imgState.isSuccess &&
              imgState?.images.map((i, j) => {
                return (
                  <div className=" position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            {imgState?.images.length === 0 &&
              defaultImg.length &&
              defaultImg?.map((i, j) => {
                return (
                  <div className=" position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
          </div>
          <div className="">
            <button
              className="btn btn-success border-0 rounded-3 my-5 mx-5"
              type="submit"
            >
              Update Product
            </button>

            <button
              className="btn btn-danger border-0 rounded-3 my-5"
              type="button"
              onClick={() => navigate("/admin/list-product")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editproduct;
