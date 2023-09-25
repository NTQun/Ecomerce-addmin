import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};

const getOrder = async (id) => {
  const responce = await axios.get(`${base_url}user/getOrder/${id}`, config);

  return responce.data;
};
const updateOrder = async (data) => {
  const responce = await axios.put(
    `${base_url}user/updateOrder/${data.id}`,
    { status: data.status },
    config
  );

  return responce.data;
};

const getMonthlyOrders = async () => {
  const responce = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    config
  );

  return responce.data;
};

const getYearlyStats = async () => {
  const responce = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    config
  );

  return responce.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
};

export default authService;
