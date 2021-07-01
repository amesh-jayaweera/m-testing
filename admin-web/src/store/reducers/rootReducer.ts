import {combineReducers} from "redux";
import {adminProfileUpdateReducer, employeeEmailsReducer, employeeReducer} from "./employeeReducer";
import {authReducer} from "./authReducer";
import {
    adminTableReducer,
    employeeTableReducer,
    recurrenceJobReducer,
    runningJobReducer,
    scheduledTableReducer
} from "./tablesReducer";
import {scheduleJobReducer} from "./jobSchedulingReducer";

export const rootReducer = combineReducers({
    auth : authReducer,
    employee : employeeReducer,
    adminTable : adminTableReducer,
    employeeTable : employeeTableReducer,
    employeeEmails : employeeEmailsReducer,
    scheduleJob : scheduleJobReducer,
    scheduleJobTable : scheduledTableReducer,
    adminProfileUpdate : adminProfileUpdateReducer,
    recurrenceJobs : recurrenceJobReducer,
    runningJobs : runningJobReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;