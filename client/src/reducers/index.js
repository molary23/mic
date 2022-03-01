import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import adminReducer from "./adminReducer";
import searchReducer from "./searchReducer";
import providerReducer from "./providerReducer";
import providerSearchReducer from "./providerSearchReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  admin: adminReducer,
  provider: providerReducer,
  searchTerms: searchReducer,
  providerSearch: providerSearchReducer,
});
