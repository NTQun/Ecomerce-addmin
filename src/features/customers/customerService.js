import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config, configManager } from "../../utils/axiosconfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`);

  return response.data;
};
const blockUser = async (id) => {
  const response = await axios.put(
    `${base_url}user/block-user/${id}`,
    {
      isBlocked: true,
    },
    config
  );

  return response.data;
};
const unblockUser = async (id) => {
  const response = await axios.put(
    `${base_url}user/unblock-user/${id}`,
    {
      isBlocked: false,
    },
    config
  );

  return response.data;
};

const customerService = {
  getUsers,
  blockUser,
  unblockUser,
};

export default customerService;
