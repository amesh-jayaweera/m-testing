import {TableActions, AdminListTableState, EmployeeListTableState} from "../../type";
import {ADMIN_TABLE_DATA, EMPLOYEE_TABLE_DATA} from "../actionTypes";

const initAdminsState : AdminListTableState = {
    data : []
};

export const adminTableReducer = ( state: AdminListTableState = initAdminsState, action: TableActions) => {
    switch (action.type) {
        case ADMIN_TABLE_DATA :
            return  {
                data : action.data
            }
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
            }
        default: return state
    }
};

