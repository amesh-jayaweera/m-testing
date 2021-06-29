import {ScheduleJobAction, ScheduleJobState} from "../../type";
import {
    SCHEDULE_JOB_DEFAULT,
    SCHEDULE_JOB_FAILED,
    SCHEDULE_JOB_SUCCESS,
    SCHEDULE_JOB_TITLE_ALREADY_EXISTS
} from "../actionTypes";

const initStateScheduleJob : ScheduleJobState = {
    type : SCHEDULE_JOB_DEFAULT
};

export const scheduleJobReducer = ( state: ScheduleJobState = initStateScheduleJob, action: ScheduleJobAction) => {
    switch (action.type) {
        case SCHEDULE_JOB_SUCCESS:
            return {
                ...state,
                type : SCHEDULE_JOB_SUCCESS,
                message : action.message
            }
        case SCHEDULE_JOB_FAILED:
            return {
                ...state,
                type : SCHEDULE_JOB_FAILED,
                error : action.error
            }
        case SCHEDULE_JOB_TITLE_ALREADY_EXISTS:
            return {
                ...state,
                type : SCHEDULE_JOB_TITLE_ALREADY_EXISTS,
                error : action.error
            }
        case SCHEDULE_JOB_DEFAULT:
            return {
                type : SCHEDULE_JOB_DEFAULT,
                message : "",
                error : ""
            }
        default: return state;
    }
}