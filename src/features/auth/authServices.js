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

const getMonthlyOrders = async (data) => {
  const responce = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    data
  );

  return responce.data;
};

const getYearlyStats = async (data) => {
  const responce = await axios.get(
    `${base_url}user/getYearlyTotalOrders`,
    data
  );

  return responce.data;
};

const updateUser = async (data) => {
  const response = await axios.put(
    `${base_url}user/edit-user`,
    data.data,
    data.config2
  );
  if (response.data) {
    return response.data;
  }
};

const forgotPassToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetPass = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};
const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder,
  updateUser,
  forgotPassToken,
  resetPass,
};

export default authService;
