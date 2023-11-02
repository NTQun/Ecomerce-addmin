const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const getTokenFromLocalStorageDelivery = localStorage.getItem("delivery")
  ? JSON.parse(localStorage.getItem("delivery"))
  : null;
const getTokenFromLocalStorageManager = localStorage.getItem("manager")
  ? JSON.parse(localStorage.getItem("manager"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

export const configManager = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorageManager !== null
        ? getTokenFromLocalStorageManager.token
        : ""
    }`,
    Accept: "application/json",
  },
};
export const configDelivery = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorageDelivery !== null
        ? getTokenFromLocalStorageDelivery.token
        : ""
    }`,
    Accept: "application/json",
  },
};
