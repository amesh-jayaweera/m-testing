import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import firebase from "firebase";
import {IJob, TableActions} from "../../type";
import {AdminListTable, EmployeeListTable, JobListTable} from "../table";
import {ADMIN_TABLE_DATA, EMPLOYEE_TABLE_DATA, SCHEDULED_JOB_TABLE_DATA} from "../actionTypes";

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
                admins.push(admin);
            });

            dispatch({
                type : ADMIN_TABLE_DATA,
                data : admins
            })
        });
    }
}

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
                employees.push(employee);
            });

            dispatch({
                type : EMPLOYEE_TABLE_DATA,
                data : employees
            })
        });
    }
}

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
                _job.noOfWorkedEmployees = '<div className="badge badge-dyellow text-dark">' +
                    String(job.assignedEmployees.length) + '</div>';
                _job.createdAdmin = (job.createdBy.firstName && job.createdBy.lastName) ?
                    (job.createdBy?.firstName + " " + job.createdBy?.lastName) : job.createdBy.email
                    ? job.createdBy.email : "NOT_DEFINED";
                _job.updatedAdmin = (job.updatedBy.firstName && job.updatedBy.lastName) ?
                    (job.updatedBy?.firstName + " " + job.updatedBy?.lastName) : job.updatedBy.email
                        ? job.updatedBy.email : "NOT_DEFINED";
                _job.createdDate = (job.createdDate as any).toDate().toISOString();
                _job.updatedDate = (job.updatedDate as any).toDate().toISOString();
                jobs.push(_job);
            });

            dispatch({
                type : SCHEDULED_JOB_TABLE_DATA,
                data : jobs
            })
        });
    }
}

