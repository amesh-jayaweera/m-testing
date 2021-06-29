import {combineReducers} from "redux";
import {employeeEmailsReducer, employeeReducer} from "./employeeReducer";
import {authReducer} from "./authReducer";
import {adminTableReducer, employeeTableReducer} from "./tablesReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    employee : employeeReducer,
    adminTable : adminTableReducer,
    employeeTable : employeeTableReducer,
    employeeEmails : employeeEmailsReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
