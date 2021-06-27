// Auth
export interface LoggedUser {
    firstName : string;
    lastName : string;
    email: string;
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

type EmployeeState = {
    employees : IEmployee[];
};

type EmployeeAction = {
    type : string;
    employee : IEmployee;
};

type EmployeeRegisterAction = {
    type : string;
    progress? : number; // default 100
    error? : string;
}

type TableActions = {
    type : string;
    data : any[];
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

// type DispatchType = (args : EmployeeAction) => EmployeeAction;

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

export const ADMIN : string = "ADMIN";
export const EMPLOYEE : string  = "EMPLOYEE";
