import {ILocation} from "../type";

export interface AdminListTable {
    id : number;
    email : string;
    firstName : string;
    lastName : string;
    gender : string;
    birthday : string;
    contactNumber : string;
    address : string;
}

export interface EmployeeListTable {
    id : number;
    email : string;
    firstName : string;
    lastName : string;
    gender : string;
    birthday : string;
    contactNumber : string;
    address : string;
    position :  string;
}

export interface JobListTable {
    id : number;
    startedDate : string;
    jobID : string;
    title : string;
    category : string;
    address : string;
    recurrence : string;
    shiftOn : string;
    shiftOff : string;
    days : string;
    location : ILocation;
    status : string;
    noOfWorkedEmployees : any;
    assignedEmployees : any[];
    active : boolean;
    createdAdmin : string | "NOT_DEFINED";
    createdDate : string;
    updatedAdmin : string;
    updatedDate : string;
    action  : any;
}

