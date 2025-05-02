import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import nasaReducer from "./features/nasa/nasaReducer";
import authReducer from "./features/auth/authReducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "auth",
    "nasa",
  ],
};

const appReducer = combineReducers({
  nasa: nasaReducer,
  auth: authReducer,
 
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
