import axios from "axios";
import { config, configDelivery, configManager } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    if (response.data.role == "admin" || response.data.role == "manager") {
      localStorage.setItem("user", JSON.stringify(response.data));
    } else {
      localStorage.setItem("delivery", JSON.stringify(response.data));
    }
  }
  return response.data;
};

const getOrders = async () => {
  const response = await axios.get(
    `${base_url}user/getallorders`,
    config || configManager
  );

  return response.data;
};

const getOrder = async (id) => {
  const responce = await axios.get(
    `${base_url}user/getOrder/${id}`,
    config || configManager || configDelivery
  );

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
  console.log(data);
  const response = await axios.put(
    `${base_url}user/edit-user/${data.id}`,
    {
      firstname: data.data.firstname,
      lastname: data.data.lastname,
      email: data.data.email,
      mobile: data.data.mobile,
    },
    config
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

const createUser = async (data) => {
  const response = await axios.post(`${base_url}user/register/`, data);
  if (response.data) {
    return response.data;
  }
};

const getAllUser = async () => {
  const response = await axios.get(`${base_url}user`, config || configManager);
  if (response.data) {
    return response.data;
  }
};

const getAUser = async (id) => {
  const response = await axios.get(
    `${base_url}user/${id}`,
    config || configManager
  );
  if (response.data) {
    return response.data;
  }
};
const deleteUser = async (id) => {
  const response = await axios.delete(
    `${base_url}user/${id}`,
    config || configManager
  );
  if (response.data) {
    return response.data;
  }
};

const updatepw = async (data) => {
  const response = await axios.put(
    `${base_url}user/password`,
    data,
    config || configManager
  );
  if (response.data) {
    return response.data;
  }
};
const addShipperOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/add-shipper/${data.id}`,
    { _id: data._id },
    configDelivery || config || configManager
  );
  if (response.data) {
    return response.data;
  }
};
const getOrderShipper = async (id) => {
  const response = await axios.post(`${base_url}user/order-by-shippper/${id}`);
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
  createUser,
  getAllUser,
  deleteUser,
  getAUser,
  updatepw,
  addShipperOrder,
  getOrderShipper,
};

export default authService;
