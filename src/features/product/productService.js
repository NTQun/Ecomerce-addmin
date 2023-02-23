import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getProducts = async () => {
  const responce = await axios.get(`${base_url}product/`);

  return responce.data;
};

const createProduct = async (product) => {
  const responce = await axios.post(`${base_url}product/`, product, config);

  return responce.data;
};

const productService = {
  getProducts,
  createProduct,
};
export default productService;
