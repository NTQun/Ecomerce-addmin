import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import pcategorySlice from "../features/pcategory/pcategorySlice";
import colorSlice from "../features/color/colorSlice";
import blogSlice from "../features/blogs/blogSlice";
import bCategoryReducer from "../features/bcategory/bcategorySlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    pCategory: pcategorySlice,
    color: colorSlice,
    blogs: blogSlice,
    bCategory: bCategoryReducer,
    enquiry: enquiryReducer,
  },
});
