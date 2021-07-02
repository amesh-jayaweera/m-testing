import {combineReducers} from "redux";
import {adminProfileUpdateReducer, employeeEmailsReducer, employeeReducer} from "./employeeReducer";
import {authReducer} from "./authReducer";
import {
    adminTableReducer,
    employeeTableReducer,
    recurrenceJobReducer, runningJobHistoryReducer,
    runningJobReducer,
    scheduledTableReducer
} from "./tablesReducer";
import {scheduleJobReducer} from "./jobSchedulingReducer";
import {menuReducer} from "./otherReducer";

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
    runningJobs : runningJobReducer,
    jobHistory : runningJobHistoryReducer,
    menu : menuReducer
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
