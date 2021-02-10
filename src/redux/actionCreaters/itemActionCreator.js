import * as ActionTypes from "../actions/itemActions";
import axios from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./../../auth/authentication";

const apiEndPoint = process.env.REACT_APP_API_URL + "/items/";

export const addItem = async (dispatch, item) => {
  try {
    console.log(item);
    const { data } = await axios.post(apiEndPoint, item);
    dispatch({
      type: ActionTypes.ADD_ITEM,
      payload: data,
    });
  } catch (error) {
    toast.dark(error.response.data);
    throw error;
  }
};

export const fetchItemsList = async (dispatch) => {
  const { data: items } = await axios.get(apiEndPoint);

  dispatch({
    type: ActionTypes.FETCH_ITEMS_LIST,
    payload: items,
  });
};

export const fetchMyItems = async (dispatch) => {
  const { data: items } = await axios.get(
    apiEndPoint + "myitems/" + getCurrentUser()._id
  );

  dispatch({
    type: ActionTypes.FETCH_ITEMS_LIST,
    payload: items,
  });
};

export const deleteMyItem = async (dispatch, item) => {
  const { data: items } = await axios.delete(
    apiEndPoint + "myitems/" + item._id
  );

  dispatch({
    type: ActionTypes.DELETE_ITEM,
    payload: items,
  });

  window.location = "/";
  toast.dark("Item Deleted Successfully");
};
