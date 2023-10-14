import axios from "axios";
import { configDelivery } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const loginDelivery = async (delivery) => {
  const response = await axios.post(`${base_url}user/delivery-login`, delivery);
  if (response.data) {
    localStorage.setItem("delivery", JSON.stringify(response.data));
  }
  return response.data;
};

const getOrdersDelivery = async () => {
  const response = await axios.get(
    `${base_url}user/delivery-getallorders`,
    configDelivery
  );

  return response.data;
};

const getOrderDelivery = async (id) => {
  const responce = await axios.get(
    `${base_url}user/delivery-getOrder/${id}`,
    configDelivery
  );

  return responce.data;
};

const updateOrderDelivery = async (data) => {
  const responce = await axios.put(
    `${base_url}user/delivery-updateOrder/${data.id}`,
    { status: data.status },
    configDelivery
  );

  return responce.data;
};

const deliveryServices = {
  loginDelivery,
  getOrdersDelivery,
  getOrderDelivery,
  updateOrderDelivery,
};

export default deliveryServices;
