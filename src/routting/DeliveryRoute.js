import { Navigate } from "react-router-dom";

export const DeliverRoute = ({ children }) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("delivery"));
  return getTokenFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
