import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import firebase from "firebase";
import {IJob, IJobRecurrence, IJobRunning, TableActions} from "../../type";
import {AdminListTable, EmployeeListTable, JobListTable} from "../table";
import {
    ADMIN_TABLE_DATA,
    EMPLOYEE_TABLE_DATA,
    RECURRENCE_JOBS,
    RUNNING_JOBS, RUNNING_JOBS_HISTORY,
    SCHEDULED_JOB_TABLE_DATA
} from "../actionTypes";
import React from "react";

const RenderViewAction = (url : string) => {

    return (
        <a  href={url}><div className="badge badge-dgreen text-white">View</div></a>
    )
};

export const getAdmins = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();

    return async dispatch => {

        let admins : AdminListTable[] = [];

        db.collection("admins").get().then((querySnapshot) => {
            let count = 0;
            querySnapshot.forEach((doc) => {
                let admin : AdminListTable  = doc.data() as AdminListTable;
                count += 1;
                admin.id = count;
                admin.action = RenderViewAction(`#admin/view?id=${doc.id}`);
                admins.push(admin);
            });

            dispatch({
                type : ADMIN_TABLE_DATA,
                data : admins
            })
        });
    }
};

export const getEmployees = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();

    return async dispatch => {

        let employees : EmployeeListTable[] = [];

        db.collection("employees").get().then((querySnapshot) => {
            let count = 0;
            querySnapshot.forEach((doc) => {
                let employee : EmployeeListTable  = doc.data() as EmployeeListTable;
                count += 1;
                employee.id = count;
                employee.action = RenderViewAction(`#employee/view?id=${doc.id}`);
                employees.push(employee);
            });

            dispatch({
                type : EMPLOYEE_TABLE_DATA,
                data : employees
            })
        });
    }
};

const RenderNoOfWorkedEmployees = (num : number) => {
    return (
        <div className="badge badge-dyellow text-dark">{num}</div>
    )
};

const RenderEditAction = (id : string) => {

    return (
        <div className="row">
            <div className="col-6">
                <a  href={`#jobs/schedule-job/view?id=${id}`}><div className="badge badge-dgreen text-white">View</div></a>
            </div>
            <div className="col-6">
                <a href={`#jobs/schedule-job/edit?id=${id}`}><div className="badge badge-dyellow text-dark">Edit</div></a>
            </div>
        </div>
    )
};

export const getScheduledJobs = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();

    return async dispatch => {

        let jobs : JobListTable[] = [];

        db.collection("jobs").get().then((querySnapshot) => {
            let count = 0;
            querySnapshot.forEach((doc) => {
                let job : IJob  = doc.data() as IJob;
                let _job : JobListTable =  doc.data() as JobListTable;
                count += 1;
                _job.id = count;
                _job.jobID = doc.id;
                _job.noOfWorkedEmployees = RenderNoOfWorkedEmployees(job.assignedEmployees.length);
                _job.createdAdmin = (job?.createdBy?.firstName && job.createdBy.lastName) ?
                    (job.createdBy?.firstName + " " + job.createdBy?.lastName) : job?.createdBy?.email
                    ? job?.createdBy?.email : "NOT_DEFINED";
                _job.updatedAdmin = (job.updatedBy.firstName && job.updatedBy.lastName) ?
                    (job.updatedBy?.firstName + " " + job.updatedBy?.lastName) : job.updatedBy.email
                        ? job.updatedBy.email : "NOT_DEFINED";
                _job.createdDate = (job.createdDate as any).toDate().toISOString();
                _job.updatedDate = (job.updatedDate as any).toDate().toISOString();
                _job.action = RenderEditAction(doc.id);
                jobs.push(_job);
            });

            dispatch({
                type : SCHEDULED_JOB_TABLE_DATA,
                data : jobs
            });
        });
    }
};

export const getTodayJobs = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();
    const today = new Date();
    const month = today.getMonth()+1;
    const date  = today.getDate();
    const todayStr : string = `${today.getFullYear()}-${(month/10) < 1 ? "0" : ""}${month}-${(date/10) < 1 ? "0" : ""}${today.getDate()}`;

    return async dispatch => {
        db.collection("today_jobs")
            .where("date","==",todayStr)
            .onSnapshot((querySnapshot) => {
                let jobs : IJobRecurrence[] = [];
                querySnapshot.forEach((doc) => {
                    const job : IJobRecurrence = doc.data() as IJobRecurrence;
                    jobs.push(job);
                });
                console.log("Jobs ====> ", jobs);
                dispatch({
                    type : RECURRENCE_JOBS,
                    data : jobs
                });
            });
    }
};

export const getRunningJobs = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();
    const today = new Date();
    const month = today.getMonth()+1;
    const date  = today.getDate();
    const todayStr : string = `${today.getFullYear()}-${(month/10) < 1 ? "0" : ""}${month}-${(date/10) < 1 ? "0" : ""}${today.getDate()}`;

    return async dispatch => {
        db.collection("running_jobs")
            .where("date","==",todayStr)
            .onSnapshot((querySnapshot) => {
                let jobs : IJobRunning[] = [];
                querySnapshot.forEach((doc) => {
                    const job : IJobRunning = doc.data() as IJobRunning;
                    jobs.push(job);
                });
                dispatch({
                    type : RUNNING_JOBS,
                    data : jobs
                });
            });
    }
};

export const getRunningJobHistory = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();
    const today = new Date();
    const month = today.getMonth()+1;
    const date  = today.getDate();
    const todayStr : string = `${today.getFullYear()}-${(month/10) < 1 ? "0" : ""}${month}-${(date/10) < 1 ? "0" : ""}${today.getDate()}`;

    return async dispatch => {
        db.collection("running_jobs")
            .where("date","!=",todayStr)
            .get()
            .then((querySnapshot) => {
                let jobs : IJobRunning[] = [];
                querySnapshot.forEach((doc) => {
                    let job : IJobRunning = doc.data() as IJobRunning;
                    const employee : any = job.employee;
                    job.employeeDetails = `${employee.email}\n${employee.firstName} ${employee.lastName}\n${employee.position}`;
                    jobs.push(job);
                });
                dispatch({
                    type : RUNNING_JOBS_HISTORY,
                    data : jobs
                });
            });
    }
};