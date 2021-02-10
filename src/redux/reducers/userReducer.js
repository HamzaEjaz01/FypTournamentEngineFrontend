import * as ActionTypes from "../actions/userActions";

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      let user = action.payload;

      let newUser = [...state];

      newUser.push(user);
      return newUser;


    case ActionTypes.FETCH_USER_LIST:
      return action.payload;

      case ActionTypes.UPDATE_USER:
      let user2 = action.payload;

      let users2 = [...state];
      let index = users2.findIndex((u) => u._id === user2._id);
      users2[index] = user2;
      return users2;
      
    default:
      return state;
  }
};
