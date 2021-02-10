import * as ActionTypes from "../actions/userActions";
import axios from "axios";
import { toast } from "react-toastify";
import { getJwt } from "../../auth/authentication";
import { logout } from "../../auth/authentication";

const apiEndPoint = process.env.REACT_APP_API_URL + "/users";

axios.defaults.headers.common["x-auth-token"] = getJwt();

export const fetchUserList = async (dispatch) => {
  const { data: users } = await axios.get(apiEndPoint);

  dispatch({
    type: ActionTypes.FETCH_USER_LIST,
    payload: users,
  });
};

export const addUser = async (dispatch, user) => {
  try {
    const { data } = await axios.post(apiEndPoint, user);
    dispatch({
      type: ActionTypes.ADD_USER,
      payload: data,
    });
  } catch (error) {
    toast.dark(error.response.data);
    throw error;
  }
};

export const passwordRecovery = async (email) => {
  try {
    const { data } = await axios.post(apiEndPoint + "/passwordRecovery", {
      email: email,
    });

    console.log("data", data);

    toast.dark(data);
  } catch (error) {
    console.log(error);
    toast.dark(error.response.data);
    throw error;
  }
};
// to update user
export const updateUser = async (dispatch, user) => {
  try {
    //console.log(user);
    const response = await axios.put(apiEndPoint + "/" + user._id, user);
    //console.log(response.data);
    toast.dark("Profile Updated Successfully");
    logout();
    window.location = "/login";

    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: response.data,
    });
  } catch (error) {
    toast.dark(error.response.data);
    console.log(error.response.data);
  }
};

//for block-unblock send emails as status changed
export const block_unblock = async (dispatch, user) => {
  //console.log(user);
  try {
    const response = await axios.put(apiEndPoint + "/status/" + user._id, user);
    //console.log(response.data);
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: response.data,
    });
  } catch (error) {
    toast.dark(error.response.data);
  }
};
