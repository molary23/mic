import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import adminReducer from "./adminReducer";
import searchReducer from "./searchReducer";
import providerReducer from "./providerReducer";
import providerSearchReducer from "./providerSearchReducer";
import userReducer from "./userReducer";
import userSearchReducer from "./userSearchReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  admin: adminReducer,
  provider: providerReducer,
  user: userReducer,
  searchTerms: searchReducer,
  providerSearch: providerSearchReducer,
  userSearch: userSearchReducer,
});
