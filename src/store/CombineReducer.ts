import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import registeruserReducer from "./slices/registeruserSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
   chat: chatReducer,
   registeruser: registeruserReducer
});
