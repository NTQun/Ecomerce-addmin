import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}product?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.getcate ? `category=${data?.getcate}&&` : ""
    }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${
      data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""
    }${data?.sort ? `sort=${data?.sort}&&` : ""}`
  );
  if (response.data) {
    return response.data;
  }
};
const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      importprice: product.productData.importprice,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      tags: product.productData.tags,
      price: product.productData.price,
      colors: product.productData.colors,
      quantity: product.productData.quantity,
      images: product.image,
    },
    config
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const getWarehouse = async () => {
  const response = await axios.get(`${base_url}product/warehouse`);

  return response.data;
};

const addWarehouse = async (data) => {
  const response = await axios.post(`${base_url}product/warehouse/${data}`, {});
  return response.data;
};

const importProduct = async (data) => {
  console.log(data);
  const response = await axios.post(
    `${base_url}product/import-warehouse/${data.id}`,
    {
      price: data.data.price,
      importprice: data.data.importprice,
      quantity: data.data.quantity,
    }
  );

  return response.data;
};

const deleteProWh = async (id) => {
  const response = await axios.delete(`${base_url}product/warehouse/${id}`);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getWarehouse,
  addWarehouse,
  importProduct,
  deleteProWh,
};

export default productService;
