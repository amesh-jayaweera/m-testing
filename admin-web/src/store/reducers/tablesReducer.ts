import {TableActions, AdminListTableState, EmployeeListTableState, ScheduledTableState} from "../../type";
import {ADMIN_TABLE_DATA, EMPLOYEE_TABLE_DATA, SCHEDULED_JOB_TABLE_DATA} from "../actionTypes";

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

