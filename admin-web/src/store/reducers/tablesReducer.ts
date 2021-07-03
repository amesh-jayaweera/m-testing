import {TableActions, AdminListTableState, EmployeeListTableState, ScheduledTableState, JobState} from "../../type";
import {
    ADMIN_TABLE_DATA,
    EMPLOYEE_TABLE_DATA, LOADING,
    RECURRENCE_JOBS,
    RUNNING_JOBS, RUNNING_JOBS_HISTORY,
    SCHEDULED_JOB_TABLE_DATA
} from "../actionTypes";

const initAdminsState : AdminListTableState = {
    loading : true,
    data : []
};

export const adminTableReducer = ( state: AdminListTableState = initAdminsState, action: TableActions) => {
    switch (action.type) {
        case ADMIN_TABLE_DATA :
            return  {
                loading: false,
                data : action.data
            };
        case LOADING:
            return {
                loading : true,
               data : action.data
            };
        default: return state
    }
};

const initEmployeesState : EmployeeListTableState = {
    loading : true,
    data : []
};

export const employeeTableReducer = ( state: EmployeeListTableState = initEmployeesState, action: TableActions) => {
    switch (action.type) {
        case EMPLOYEE_TABLE_DATA :
            return  {
                loading : false,
                data : action.data
            };
        case LOADING:
            return {
                loading: true,
                data: action.data
            };
        default: return state
    }
};

const initJobState : ScheduledTableState = {
    loading : true,
    data : []
};

export const scheduledTableReducer = ( state: ScheduledTableState = initJobState, action: TableActions) => {
    switch (action.type) {
        case SCHEDULED_JOB_TABLE_DATA :
            return  {
                loading : false,
                data : action.data
            };
        case LOADING:
            return {
                loading: true,
                data : action.data
            };
        default: return state
    }
};

const initRecurrenceJobState : JobState = {
    loading : true,
    data : []
};

export const recurrenceJobReducer = (state: JobState = initRecurrenceJobState, action: TableActions) => {
    switch (action.type) {
        case RECURRENCE_JOBS:
            return  {
                loading : false,
                data : action.data
            };
        case LOADING:
            return {
                loading: true,
                data : action.data
            };
        default: return state
    }
};

const initRunningJobState : JobState = {
    loading : true,
    data : []
};

export const runningJobReducer = (state: JobState = initRunningJobState, action: TableActions) => {
    switch (action.type) {
        case RUNNING_JOBS:
            return  {
                loading : false,
                data : action.data
            };
        case LOADING:
            return  {
                loading:  true,
                data : action.data
            };
        default: return state
    }
};

const initRunningJobHistoryState : JobState = {
    loading : true,
    data : []
};

export const runningJobHistoryReducer = (state : JobState = initRunningJobHistoryState, action : TableActions) => {
    switch (action.type) {
        case RUNNING_JOBS_HISTORY:
            return {
                loading : false,
                data : action.data
            };
        case LOADING:
            return  {
                loading: true,
                data : action.data
            };
        default: return state;
    }
};
