import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { tournamentReducer } from "./reducers/tournamentReducer";
import { userReducer } from "./reducers/userReducer";
import { itemReducer } from "./reducers/itemReducer";

const AllReducers = combineReducers({
  tournament: tournamentReducer,
  user: userReducer,
  item: itemReducer,
});

const store = createStore(
  AllReducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
