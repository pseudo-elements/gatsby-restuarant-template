import { combineReducers } from "redux";
import userReducer from "./user";
import sessionReducer from "./session";
import snackbarReducer from "./snackBar";
import currencyReducer from "./currency";

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  snackbar: snackbarReducer,
  currency: currencyReducer,
});

export default rootReducer;
