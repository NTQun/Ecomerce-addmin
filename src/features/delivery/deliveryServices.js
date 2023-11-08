import axios from "axios";
import { config, configDelivery, configManager } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

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

const getOrderShipper = async (id) => {
  const response = await axios.post(
    `${base_url}user/order-by-shippper/${id}`,
    configDelivery
  );
  if (response.data) {
    return response.data;
  }
};

const deliveryServices = {
  getOrdersDelivery,
  getOrderDelivery,
  updateOrderDelivery,
  updateUser,
  getOrderShipper,
};

export default deliveryServices;
