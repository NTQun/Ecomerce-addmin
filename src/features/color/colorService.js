import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);

  return response.data;
};
const createColors = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);

  return response.data;
};
const colorService = {
  getColors,
  createColors,
};

export default colorService;
