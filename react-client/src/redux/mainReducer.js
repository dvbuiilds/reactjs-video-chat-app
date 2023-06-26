import { combineReducers } from "redux";
import dashboardReducer from "./Dashboard/reducer";
import callReducer from "./Call/reducer";

export default combineReducers({
    dashboard: dashboardReducer,
    call: callReducer
});