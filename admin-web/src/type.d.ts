// Auth
import {SET_ERROR, SET_LOADING, SET_SUCCESS, SET_USER, SIGN_OUT} from "./store/actionTypes";

export interface LoggedUser {
    firstName : string;
    lastName : string;
    gender : string;
    birthday : string;
    email : string;
    contactNumber : string;
    address : string;
}

export interface AuthState {
    user: LoggedUser | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    success: string;
}

export interface SignInData {
    email: string;
    password: string;
}

// Auth Actions
interface SetUserAction {
    type: typeof SET_USER;
    payload: LoggedUser;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
    payload? : string | undefined;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetSuccessAction;

// Employee or Admin
export interface IEmployee {
    uid? : string;
    firstName : string;
    lastName : string;
    gender : string;
    birthday : string;
    email : string;
    contactNumber : string;
    address : string;
    position? : string;
    otherDetails? : string;
    passportCopy? : string;
    policeReport? : string;
    createdDateTime : Date;
}

type EmployeeRegisterAction = {
    type : string;
    progress? : number; // default 100
    error? : string;
}

type TableActions = {
    type : string;
    data : any[];
}

type EmployeeEmailsAction = {
    type : string;
    emails : any[];
}

export interface EmployeeRegistrationState {
    processing : boolean;
    type : string;
    message? : string;
    error? : string;
    progress? :  number;
}

export interface AdminListTableState  {
    data : any[];
}

export interface EmployeeListTableState  {
    data : any[];
}

export interface EmployeeEmailsState {
    emails : any[];
}

export interface ScheduledTableState {
    data : any[];
}

export interface IEmployeeValidation {
    firstNameReq : boolean;
    lastNameReq : boolean;
    emailReq : boolean;
    emailFormatInvalid : boolean;
    contactNoReq : boolean;
    addressReq : boolean;
    genderReq : boolean;
    positionReq? : boolean;
}

export interface ILocation {
    lat1 : number | 0.0;
    lon1 : number | 0.0;
    lat2 : number | 0.0;
    lon2 : number | 0.0;
    lat3 : number | 0.0;
    lon3 : number | 0.0;
    lat4 : number | 0.0;
    lon4 : number | 0.0;
}

export interface IJobForm {
    id : string;
    title : string;
    category : string;
    description : string;
    address : string;
    startingDate : string;
    recurrence : string;
    days : string[];
    shiftOn : string;
    shiftOff : string;
    locations : ILocation;
    assignedEmployees : string[];
}

export interface IJob {
    title : string;
    category : string;
    description : string;
    address : string;
    startingDate : string;
    recurrence : string;
    days : string[];
    shiftOn : string;
    shiftOff : string;
    locations : ILocation;
    assignedEmployees : string[];
    createdDate : Date;
    updatedDate : Date;
    createdBy : {
        email : string | undefined;
        firstName : string | undefined;
        lastName : string | undefined;
    };
    updatedBy : {
        email : string | undefined;
        firstName : string | undefined;
        lastName : string | undefined;
    };
    status : string;
    active : boolean;
}

export interface IJobValidation {
    titleReq : boolean;
    categoryReq : boolean;
    descriptionReq : boolean;
    addressReq : boolean;
}

type ScheduleJobAction  = {
    type : string;
    message? : string;
    error? : string;
}

type ScheduleJobState  = {
    type : string;
    message? : string;
    error? : string;
}