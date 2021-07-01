import {EmployeeEmailsAction, EmployeeRegisterAction, IEmployee} from "../../type";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import firebase from "firebase";

import {
    EMPLOYEE_EMAILS,
    PASSPORT_UPLOAD_FAILED, PASSPORT_UPLOAD_SUCCESS, POLICE_REPORT_UPLOAD_FAILED, POLICE_REPORT_UPLOAD_SUCCESS,
    USER_ALREADY_EXISTS, USER_REGISTRATION_COMPLETED,
    USER_REGISTRATION_FAILED,
    USER_REGISTRATION_PROGRESS,
    USER_REGISTRATION_SUCCESS
} from "../actionTypes";

export const registerEmployee = (employee : IEmployee, passport : any, policeReport : any, userType : string):
    ThunkAction<void, RootState, null, EmployeeRegisterAction> => {

    let collectionPath = "";
    let passportStoragePath = "";
    let policeReportStoragePath = "";

    if(userType === "ADMIN") {
        collectionPath = "admins";
        passportStoragePath = "admins/passports/";
        policeReportStoragePath = "admins/police-reports/";
    } else if(userType === "EMPLOYEE") {
        collectionPath = "employees";
        passportStoragePath = "employees/passports/";
        policeReportStoragePath = "employees/police-reports/";
    }

    const db = firebase.firestore();

    return async dispatch => {
        const user = await db.collection(collectionPath).doc(employee.email.trim()).get();
        if(!user.exists) {
            employee.suspend = false; // set suspend false initially
            db.collection(collectionPath).doc(employee.email).set(employee)
                .then(() => {
                    // successfully added
                    dispatch({
                        type : USER_REGISTRATION_SUCCESS,
                        progress : 20
                    });
                    return uploadPassport(passport, policeReport , employee.email, passportStoragePath, policeReportStoragePath , dispatch);
                })
                .catch((error) => {
                    // something went wrong
                    dispatch({
                        type : USER_REGISTRATION_FAILED,
                        error : error
                    });
                });
        } else {
            // user exists
            dispatch({
                type : USER_ALREADY_EXISTS
            })
        }
    }
};

const uploadPassport = (passport : any, policeReport : any , email : string, passportStoragePath : string,
                        policeReportStoragePath : string , dispatch : any) => {
    const storage = firebase.storage();
        if(passport != null) {
            let temp = passport.name.split('.');
            const storageRefPassport = storage.ref(`${passportStoragePath}${email.trim()}.${temp[temp.length-1]}`);
            const uploadTaskPassport = storageRefPassport.put(passport);
            uploadTaskPassport.on('state_changed',
                (snapshot) => {
                    const progress =  20 + (((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 2) * (4/5);

                    dispatch({
                        type : USER_REGISTRATION_PROGRESS,
                        progress : getProgressStep(progress)
                    });
                },
                () => {
                    dispatch({
                        type : PASSPORT_UPLOAD_FAILED
                    });
                    return uploadPoliceReport(policeReport, email, policeReportStoragePath ,dispatch);
                },
                () => {
                    dispatch({
                        type : PASSPORT_UPLOAD_SUCCESS
                    });
                    return uploadPoliceReport(policeReport, email, policeReportStoragePath , dispatch);
                }
            );
        } else {
            return uploadPoliceReport(policeReport, email, policeReportStoragePath ,dispatch);
        }
};

const uploadPoliceReport = (policeReport : any, email : string, policeReportStoragePath : string ,dispatch : any) => {
    const storage = firebase.storage();
        if(policeReport != null) {
            let temp = policeReport.name.split('.');
            const storageRefPoliceReport = storage.ref(`${policeReportStoragePath}${email.trim()}.${temp[temp.length-1]}`);
            const uploadTaskPoliceReport = storageRefPoliceReport.put(policeReport);
            uploadTaskPoliceReport.on('state_changed',
                (snapshot) => {
                    const progress = 60 + ((((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / 2)) * (4/5);
                    dispatch({
                        type : USER_REGISTRATION_PROGRESS,
                        progress : getProgressStep(progress)
                    });
                },
                () => {
                    dispatch({
                        type : POLICE_REPORT_UPLOAD_FAILED
                    });
                    dispatch({
                        type : USER_REGISTRATION_COMPLETED
                    });
                },
                () => {
                    dispatch({
                        type : POLICE_REPORT_UPLOAD_SUCCESS
                    });
                    dispatch({
                        type : USER_REGISTRATION_COMPLETED
                    });
                }
            );
        } else {
            dispatch({
                type : USER_REGISTRATION_COMPLETED
            });
        }
};

function getProgressStep(progress : number) {
    if(progress <= 10)
        progress = 10;
    else if(progress <= 20)
        progress = 20;
    else if(progress <= 30)
        progress = 30;
    else if(progress <= 40)
        progress = 40;
    else if(progress <= 50)
        progress = 50;
    else if(progress <= 60)
        progress = 60;
    else if(progress <= 70)
        progress = 70;
    else if(progress <= 80)
        progress = 80;
    else if(progress <= 90)
        progress = 90;
    else
        progress = 100;
    return progress;
}

export const getAllEmployeeEmails = (): ThunkAction<void, RootState, null, EmployeeEmailsAction> => {

    const db = firebase.firestore();

    return async dispatch => {
        db.collection("employees").get().then((querySnapshot) => {
            let emails : any[] = [];
            querySnapshot.forEach((doc) => {
                let data = doc.id?.trim();
                if(data != null) {
                    emails.push({label : data, value : data});
                }
            });

            dispatch({
                type : EMPLOYEE_EMAILS,
                emails : emails
            })
        });
    }
};