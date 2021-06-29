import {EmployeeRegisterAction, IJob, IJobForm, LoggedUser} from "../../type";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import firebase from "firebase";
import {
    SCHEDULE_JOB_FAILED,
    SCHEDULE_JOB_SUCCESS, SCHEDULE_JOB_TITLE_ALREADY_EXISTS
} from "../actionTypes";

export const scheduleJob = (jobForm : IJobForm , user : LoggedUser , onError: () => void) : ThunkAction<void, RootState, null, EmployeeRegisterAction> => {

    const today = new Date();
    let job : IJob = {
        active : true,
        title : jobForm.title.trim(),
        category : jobForm.category,
        description : jobForm.description,
        address : jobForm.address,
        assignedEmployees : jobForm.assignedEmployees,
        recurrence : jobForm.recurrence,
        days : jobForm.days,
        startingDate : jobForm.startingDate,
        shiftOn : jobForm.shiftOn,
        shiftOff : jobForm.shiftOff,
        locations : jobForm.locations,
        status : "NOT STARTED",
        createdDate : today,
        updatedDate : today,
        createdBy : {
            email : user?.email,
            firstName : user?.firstName,
            lastName : user?.lastName
        },
        updatedBy : {
            email : user?.email,
            firstName : user?.firstName,
            lastName : user?.lastName
        }
    };

    const db = firebase.firestore();

    return async dispatch => {

        const jobExists = await db.collection('jobs')
            .where("title","==",job.title.trim()).get();

        if(jobExists) {
            db.collection("jobs").doc().set(job)
                .then((docRef : any) => {

                    let _docRef = db.collection('jobs').doc((docRef.id));
                    _docRef.set({
                        id : docRef.id
                    }, { merge: true });

                    // successfully added
                    dispatch({
                        type : SCHEDULE_JOB_SUCCESS,
                        message : "Successfully scheduled the new job"
                    })
                })
                .catch((error) => {
                    // something went wrong
                    dispatch({
                        type : SCHEDULE_JOB_FAILED,
                        error : error
                    })
                });
        } else {
            dispatch({
                type : SCHEDULE_JOB_TITLE_ALREADY_EXISTS,
                message : "Successfully scheduled the new job"
            })
        }
    }
}