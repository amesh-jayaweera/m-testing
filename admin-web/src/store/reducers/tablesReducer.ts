import {TableActions, AdminListTableState, EmployeeListTableState, ScheduledTableState, JobState} from "../../type";
import {
    ADMIN_TABLE_DATA,
    EMPLOYEE_TABLE_DATA,
    RECURRENCE_JOBS,
    RUNNING_JOBS,
    SCHEDULED_JOB_TABLE_DATA
} from "../actionTypes";

const initAdminsState : AdminListTableState = {
    data : []
};

export const adminTableReducer = ( state: AdminListTableState = initAdminsState, action: TableActions) => {
    switch (action.type) {
        case ADMIN_TABLE_DATA :
            return  {
                data : action.data
            };
        default: return state
    }
};

const initEmployeesState : EmployeeListTableState = {
    data : []
};

export const employeeTableReducer = ( state: EmployeeListTableState = initEmployeesState, action: TableActions) => {
    switch (action.type) {
        case EMPLOYEE_TABLE_DATA :
            return  {
                data : action.data
            };
        default: return state
    }
};

const initJobState : ScheduledTableState = {
    data : []
};

export const scheduledTableReducer = ( state: ScheduledTableState = initJobState, action: TableActions) => {
    switch (action.type) {
        case SCHEDULED_JOB_TABLE_DATA :
            return  {
                data : action.data
            };
        default: return state
    }
};

const initRecurrenceJobState : JobState = {
    data : []
};

export const recurrenceJobReducer = (state: JobState = initRecurrenceJobState, action: TableActions) => {
    switch (action.type) {
        case RECURRENCE_JOBS:
            return  {
                data : action.data
            };
        default: return state
    }
};

const initRunningJobState : JobState = {
    data : []
};

export const runningJobReducer = (state: JobState = initRunningJobState, action: TableActions) => {
    switch (action.type) {
        case RUNNING_JOBS:
            return  {
                data : action.data
            };
        default: return state
    }
};

