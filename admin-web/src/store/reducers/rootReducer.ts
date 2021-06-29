import {combineReducers} from "redux";
import {employeeEmailsReducer, employeeReducer} from "./employeeReducer";
import {authReducer} from "./authReducer";
import {adminTableReducer, employeeTableReducer} from "./tablesReducer";
import {scheduleJobReducer} from "./jobSchedulingReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    employee : employeeReducer,
    adminTable : adminTableReducer,
    employeeTable : employeeTableReducer,
    employeeEmails : employeeEmailsReducer,
    scheduleJob : scheduleJobReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
