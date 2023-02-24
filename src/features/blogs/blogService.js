import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};
const createBlog = async (Blog) => {
  const response = await axios.post(`${base_url}blog/`, Blog, config);

  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
};

export default blogService;
