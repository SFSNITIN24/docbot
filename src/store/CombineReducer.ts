import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
export const rootReducer = combineReducers({
  auth: authReducer,
   chat: chatReducer,
});
