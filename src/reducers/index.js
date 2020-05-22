import app from "./app";
import { combineReducers } from "redux";
import settings from "./settings";

export default combineReducers({
  app: app,
  settings: settings,
});
