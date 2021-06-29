import {combineReducers} from "redux";
import {employeeEmailsReducer, employeeReducer} from "./employeeReducer";
import {authReducer} from "./authReducer";
import {adminTableReducer, employeeTableReducer, scheduledTableReducer} from "./tablesReducer";
import {scheduleJobReducer} from "./jobSchedulingReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    employee : employeeReducer,
    adminTable : adminTableReducer,
    employeeTable : employeeTableReducer,
    employeeEmails : employeeEmailsReducer,
    scheduleJob : scheduleJobReducer,
    scheduleJobTable : scheduledTableReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;