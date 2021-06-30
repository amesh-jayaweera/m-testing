import {EmployeeEmailsAction, EmployeeEmailsState, EmployeeRegisterAction, EmployeeRegistrationState} from "../../type";
import {
    EMPLOYEE_EMAILS,
    PASSPORT_UPLOAD_FAILED,
    PASSPORT_UPLOAD_SUCCESS, POLICE_REPORT_UPLOAD_FAILED, POLICE_REPORT_UPLOAD_SUCCESS,
    USER_ALREADY_EXISTS, USER_REGISTRATION_COMPLETED, USER_REGISTRATION_DEFAULT,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_PROGRESS,
    USER_REGISTRATION_SUCCESS
} from "../actionTypes";

const initState : EmployeeRegistrationState = {
    processing : false,
    type : USER_REGISTRATION_DEFAULT
};

export const employeeReducer = ( state: EmployeeRegistrationState = initState, action: EmployeeRegisterAction) => {
    switch (action.type) {
        case USER_REGISTRATION_SUCCESS :
            return  {
                ...state,
                processing : true,
                type : USER_REGISTRATION_SUCCESS,
                message : "The new employee has been registered successfully.",
                progress : action.progress
            };
        case USER_REGISTRATION_FAILED :
            return {
                ...state,
                processing: false,
                type: USER_REGISTRATION_FAILED,
                error : "Something went wrong, failed to register a new employee."
            };
        case USER_REGISTRATION_PROGRESS :
            return {
                ...state,
                processing: true,
                type: USER_REGISTRATION_PROGRESS,
                progress : action.progress
            };
        case USER_ALREADY_EXISTS :
            return {
                ...state,
                processing : false,
                type: USER_ALREADY_EXISTS,
                error : "Employee already exists."
            };
        case PASSPORT_UPLOAD_SUCCESS:
            return {
                ...state,
                type: PASSPORT_UPLOAD_SUCCESS,
                message: "Passport uploaded!"
            };
        case PASSPORT_UPLOAD_FAILED:
            return {
                ...state,
                type: PASSPORT_UPLOAD_FAILED,
                error: "Failed to upload passport!"
            };
        case POLICE_REPORT_UPLOAD_SUCCESS:
            return {
                ...state,
                type: POLICE_REPORT_UPLOAD_SUCCESS,
                message: "Police report uploaded!"
            };
        case POLICE_REPORT_UPLOAD_FAILED:
            return {
                ...state,
                type: POLICE_REPORT_UPLOAD_FAILED,
                error: "Failed to upload police report!"
            };
        case USER_REGISTRATION_COMPLETED:
            return {
                ...state,
                processing: false,
                type: USER_REGISTRATION_COMPLETED
            };
        case USER_REGISTRATION_DEFAULT:
            return {
                ...state,
                processing: false,
                type : USER_REGISTRATION_DEFAULT,
                message: "",
                error : "",
                progress : 0
            };
        default: return state
    }
};

const initStateEmployeeEmailsState : EmployeeEmailsState = {
    emails : []
};

export const employeeEmailsReducer = ( state: EmployeeEmailsState = initStateEmployeeEmailsState, action: EmployeeEmailsAction) => {
    switch (action.type) {
        case EMPLOYEE_EMAILS :
            return {
                ...state,
                emails: action.emails
            };
        default:
            return state
    }
};