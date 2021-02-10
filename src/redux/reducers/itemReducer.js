import * as ActionTypes from "../actions/itemActions";

export const itemReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      let item = action.payload;

      let newItem = [...state];

      newItem.push(item);
      return newItem;

    case ActionTypes.DELETE_ITEM:
      let item3 = action.payload;

      let items3 = [...state];
      return items3.filter((t) => t._id !== item3._id);

    case ActionTypes.FETCH_ITEMS_LIST:
      return action.payload;

    default:
      return state;
  }
};
