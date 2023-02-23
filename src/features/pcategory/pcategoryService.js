import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);

  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);

  return response.data;
};
const pCategoryService = {
  getProductCategories,
  createCategory,
};
export default pCategoryService;
