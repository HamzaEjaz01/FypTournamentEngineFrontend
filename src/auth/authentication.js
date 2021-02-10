import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
const apiEndPoint = process.env.REACT_APP_API_URL + "/users/login";

export async function login(user) {
  try {
    const { data: token } = await axios.post(apiEndPoint, user);

    console.log("token", token);
    localStorage.setItem("token", token);
  } catch (error) {
    console.log(error);
    toast.dark(error.response.data);
    throw error;
  }
}

export function logout() {
  console.log("logging out...");
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

