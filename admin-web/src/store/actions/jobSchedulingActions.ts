import {IJob, IJobForm, LoggedUser, ScheduleJobAction} from "../../type";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import firebase from "firebase";
import {
    SCHEDULE_JOB_FAILED,
    SCHEDULE_JOB_SUCCESS, SCHEDULE_JOB_TITLE_ALREADY_EXISTS
} from "../actionTypes";

export const scheduleJob = (jobForm : IJobForm , user : LoggedUser , onError: () => void) : ThunkAction<void, RootState
    , null, ScheduleJobAction> => {

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

        db.collection('jobs')
            .where("title","==",job.title.trim()).get()
            .then(function(docExists : any) {
                if (docExists.empty) {
                    db.collection("jobs").doc().set(job)
                        .then(() => {
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
                }
                else {
                    dispatch({
                        type : SCHEDULE_JOB_TITLE_ALREADY_EXISTS,
                        error : "Please check again,This job title already exists!"
                    })
                }
            });
        }
    }