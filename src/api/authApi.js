import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async data => {
  let response;
  try {
    response = await api.post("/user/login", data);
    storeUserInLocalStorage(response.data);
  } catch (error) {
    return error;
  }
  return response;
};

export const register = async data => {
  let response;
  try {
    response = await api.post("/user/register", data);
    storeUserInLocalStorage(response.data);
  } catch (error) {
    return error;
  }
  return response;
};

const storeUserInLocalStorage = data => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
};
