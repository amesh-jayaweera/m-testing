import React, {useEffect, useState} from "react";
import mapIcon from "../../resources/icons/map_icon.svg";
import {MultiSelect} from "react-multi-select-component";
import {Location} from "./Common/Popup/Location";
import {useHistory, useLocation} from "react-router";
import {AddDays} from "./Common/Popup/AddDays";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getAllEmployeeEmails} from "../../store/actions/employeeActions";
import {IJob, IJobForm, IJobValidation, ILocation, LoggedUser} from "../../type";
import {validateTime} from "../../util/Regex";
import {ValidateShifts} from "../../util/Validation";
import {scheduleJob} from "../../store/actions/jobSchedulingActions";
import {Failure, Success} from "../../util/Toasts";
import {
    SCHEDULE_JOB_DEFAULT,
    SCHEDULE_JOB_FAILED,
    SCHEDULE_JOB_SUCCESS,
    SCHEDULE_JOB_TITLE_ALREADY_EXISTS,
    SCHEDULED_JOB_DOES_NOT_EXISTS,
    SCHEDULED_JOB_UPDATED_FAILED,
    SCHEDULED_JOB_UPDATED_SUCCESS
} from "../../store/actionTypes";
import {fire} from "../../index";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Skeleton from "react-loading-skeleton";
import {MapView} from "../Common/MapViewModal/MapView";

export const defaultShiftOnTime : string = "08:00";
export const defaultShiftOffTime : string = "17:00";
const days : string[] = ['Mon', 'Tue', 'Wed' ,'Thu', 'Fri', 'Sat' , 'Sun'];

export function ScheduleJob({isEdit} : {isEdit : boolean}) {

    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [editedJob, setEditedJob] = useState<IJob|null>();
    const [jobID, setJobID] = useState<string|null>();
    const { emails } = useSelector((state: RootState) => state.employeeEmails);
    const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
    const [recurrence, setRecurrence] = useState<string>("None");
    const { type, error , message } = useSelector((state: RootState) => state.scheduleJob);
    const { user } = useSelector((state: RootState) => state.auth);
    const [processing, setProcessing] = useState<boolean>(false);
    const [job, setJob] = useState<IJobForm>({
            id : "",
            title : "",
            category : "None",
            description : "",
            address : "",
            startingDate : new Date().toISOString().split('T')[0],
            recurrence : "None",
            days : [],
            shiftOn : defaultShiftOnTime,
            shiftOff : defaultShiftOffTime,
            locations : {
                lat1 : 0.0,
                lon1 : 0.0,
                lat2 : 0.0,
                lon2 : 0.0,
                lat3 : 0.0,
                lon3 : 0.0,
                lat4 : 0.0,
                lon4 : 0.0,
            },
            assignedEmployees : []
        }
    );
    const [validation, setValidation] = useState<IJobValidation>({
        titleReq : false,
        categoryReq : false,
        descriptionReq : false,
        addressReq : false,
        recurrenceReq : false
    });

    useEffect(()=> {
        dispatch(getAllEmployeeEmails());
        dispatch({
            type : SCHEDULE_JOB_DEFAULT
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(isEdit) {
            const db = fire.firestore();
            const path = location.hash;
            const docID = path.split('#jobs/schedule-job/edit?id=');
            if(docID.length >= 2) {
                setJobID(docID[1].trim());
                db.collection("jobs").doc(docID[1].trim()).get().then((doc) => {
                    if(doc.exists) {
                        let job : IJob  = doc.data() as IJob;
                        const assignedEmployees = job.assignedEmployees;
                        setSelectedEmployees(assignedEmployees);
                        setRecurrence(job.recurrence);
                        setEditedJob(job);
                        setLoading(false);
                    } else {
                       // not found
                        setLoading(false);
                        history.push('#dashbord/not-found');
                    }
                });
            } else {
                // not found
                setLoading(false);
                history.push('#dashbord/not-found');
            }
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(isEdit && editedJob && jobID) {
            setJob(prevState => ({
                ...prevState,
                id : jobID || "",
                title : editedJob.title,
                category : editedJob.category,
                description : editedJob.description,
                address : editedJob.address,
                startingDate : editedJob.startingDate,
                recurrence : editedJob.recurrence,
                days : editedJob.days,
                shiftOn : editedJob.shiftOn,
                shiftOff : editedJob.shiftOff,
                locations : {
                    lat1 : editedJob.locations.lat1,
                    lon1 : editedJob.locations.lon1,
                    lat2 : editedJob.locations.lat2,
                    lon2 : editedJob.locations.lon2,
                    lat3 : editedJob.locations.lat3,
                    lon3 : editedJob.locations.lon3,
                    lat4 : editedJob.locations.lat4,
                    lon4 : editedJob.locations.lon4,
                },
                assignedEmployees : editedJob.assignedEmployees,
                active : editedJob.active,
                status : editedJob.status
            }));
        }
    },[isEdit, editedJob, jobID]);

    useEffect(() => {
        if (type === SCHEDULE_JOB_SUCCESS || type === SCHEDULED_JOB_UPDATED_SUCCESS) {
            setProcessing(false);
            dispatch({
                type: SCHEDULE_JOB_DEFAULT
            });
            confirmAlert({
                title: "Confirm",
                message: `${isEdit ? "The Job has been updated successfully.\nDo you want to go to Jobs?"
                    : "The Job has been scheduled successfully.\nDo you want to go to Jobs ?"}`,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            history.push("#jobs");
                            Success(message as string);
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            Success(message as string);
                        }
                    }
                ]
            });
        } else if(type === SCHEDULE_JOB_FAILED || type === SCHEDULE_JOB_TITLE_ALREADY_EXISTS
            || type === SCHEDULED_JOB_DOES_NOT_EXISTS || type === SCHEDULED_JOB_UPDATED_FAILED
        ) {
            Failure(error as string);
            dispatch({
                type : SCHEDULE_JOB_DEFAULT
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type, error, message, dispatch]);

    // set recurrence days
    useEffect(() => {
        if(recurrence === 'None') {
            setJob(prevState => ({
                ...prevState,
                days : []
            }));
        } else if(recurrence === 'Daily') {
            setJob(prevState => ({
                ...prevState,
                days : days
            }));
        } else if(recurrence === 'Week days') {
            setJob(prevState => ({
                ...prevState,
                days : [days[0],days[1],days[2],days[3],days[4]]
            }));
        } else if(recurrence === 'Weekend') {
            setJob(prevState => ({
                ...prevState,
                days : [days[5] , days[6]]
            }));
        }
    },[recurrence]);

    useEffect(() => {
        setJob(prevState => ({
            ...prevState,
            recurrence : recurrence,
            assignedEmployees : selectedEmployees
        }));
    },[recurrence,selectedEmployees]);

    function onSubmit() {
        // set validations before submitting
        setValidation(prevState => ({
            ...prevState,
            titleReq : !job.title,
            categoryReq : !job.category,
            descriptionReq : !job.description,
            addressReq : !job.address,
            recurrenceReq : !recurrence || recurrence.trim() === "None"
        }));

        if(job.title && job.category && job.description && job.address && job.startingDate && job.recurrence !== "None" &&
            validateTime(job.shiftOn) && validateTime(job.shiftOff) && ValidateShifts(job.shiftOn, job.shiftOff)) {
            if (recurrence === "Custom" && job.days.length === 0) {
                if (isEdit && editedJob) {
                    history.push(`#jobs/schedule-job/edit?id=${jobID}#add-recurrence-day`);
                } else {
                    history.push('#jobs/schedule-job#add-recurrence-days');
                }
            } else {
                setProcessing(true);
                dispatch({
                    type: SCHEDULE_JOB_DEFAULT
                });
                dispatch(scheduleJob(job, user as LoggedUser, isEdit));
            }
        }
    }

    function onClear() {

        setJob(prevState => ({
            ...prevState,
            title : "",
            category : "None",
            description : "",
            address : "",
            startingDate : new Date().toISOString().split('T')[0],
            recurrence : "None",
            days : [],
            shiftOn : defaultShiftOnTime,
            shiftOff : defaultShiftOffTime,
            locations : {
                lat1 : 0.0,
                lon1 : 0.0,
                lat2 : 0.0,
                lon2 : 0.0,
                lat3 : 0.0,
                lon3 : 0.0,
                lat4 : 0.0,
                lon4 : 0.0,
            },
            assignedEmployees : [],
            id : "",
            status : "",
            active : false
        }));

        setRecurrence("None");
        setSelectedEmployees([]);
        setValidation(prevState => ({
            ...prevState,
            titleReq : false,
            categoryReq : false,
            descriptionReq : false,
            addressReq : false
        }));

        dispatch({
            type : SCHEDULE_JOB_DEFAULT
        });
    }

    function modifiedLocationString() {
        let location : ILocation = job.locations;
        return String(location.lat1) + ',' +
            String(location.lon1) + ',' +
            String(location.lat2) + ',' +
            String(location.lon2) + ',' +
            String(location.lat3) + ',' +
            String(location.lon3) + ',' +
            String(location.lat4) + ',' +
            String(location.lon4);
    }

    return (
        <>
            {loading &&
                <Skeleton count={20} duration={20}/>
            }
            {!loading &&
        <div className="pd-20 card-box mb-30">
        <form className="needs-validation">
            <div className="row">
                <div className="col-md-6">

                    <div className="form-group">
                        <label>Job Title<sup>*</sup></label>
                        <input className="form-control" type="text" placeholder="Job Title" required readOnly={isEdit}
                               value={job?.title}
                               onChange={(e)=> {
                                   setJob(prevState => ({
                                       ...prevState,
                                       title : e.target.value
                                   }));
                                   setValidation(prevState => ({
                                       ...prevState,
                                       titleReq : !e.target.value
                                   }));
                               }}
                        />
                        {
                            validation.titleReq && <small className="invalid-feedback">The job title is required.</small>
                        }
                    </div>

                    <div className="form-group">
                        <label>Job Category<sup>*</sup></label>
                        <select className="custom-select" onChange={(e)=> {
                            setJob(prevState => ({
                                ...prevState,
                                category : e.target.value
                            }));
                            setValidation(prevState => ({
                                ...prevState,
                                categoryReq : !e.target.value || e.target.value === "None"
                            }));
                        }} disabled={isEdit} value={job?.category}>
                            <option value="None">Select Job Category</option>
                            <option value="Cleaning Service">Cleaning Service</option>
                            <option value="Facility Management">Facility Management</option>
                            <option value="Body Corporate Service">Body Corporate Service</option>
                            <option value="Security Service">Security Service</option>
                        </select>
                        {
                            validation.categoryReq && <small className="invalid-feedback">Please Select Job Category.</small>
                        }
                    </div>

                    <div className="form-group">
                        <label>Job Description<sup>*</sup></label>
                        <textarea className="form-control " required
                                  value={job?.description}
                                  onChange={(e)=> {
                            setJob(prevState => ({
                                ...prevState,
                                description : e.target.value
                            }));
                            setValidation(prevState => ({
                                ...prevState,
                                descriptionReq : !e.target.value
                            }));
                        }}/>
                        {
                            validation.descriptionReq && <small className="invalid-feedback">The description is required</small>
                        }
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="form-group col-6">
                                <label>Starting Date<sup>*</sup></label>
                                <input className="form-control  date-picker" placeholder="Starting Date" type="date"
                                       disabled={isEdit}
                                      value={job.startingDate} data-date-format="DD MMMM YYYY" required
                                       onChange={(e)=> {
                                           setJob(prevState => ({
                                               ...prevState,
                                               startingDate : e.target.value
                                           }));
                                       }}
                                />
                                {
                                    !job.startingDate && <small className="invalid-feedback">The job starting date is required.</small>
                                }
                            </div>

                            <div className="form-group col-6">
                                <label>Recurrence<sup>*</sup></label>
                                <select className="custom-select"
                                        onChange={(e) => {
                                    setRecurrence(e.target.value);
                                            setValidation(prevState => ({
                                                ...prevState,
                                                recurrenceReq : !e.target.value || e.target.value.trim() === "None"
                                            }));
                                    if(e?.target?.value?.trim() === 'Custom') {
                                        (isEdit && editedJob) ?
                                            history.push(`#jobs/schedule-job/edit?id=${jobID}#add-recurrence-day`) :
                                        history.push('#jobs/schedule-job#add-recurrence-days');
                                    }
                                }}
                                value={job?.recurrence}
                                >
                                    <option value="None">Select Job Recurrence</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Week days">Week days</option>
                                    <option value="Weekend">Weekend</option>
                                    <option value="Custom">Custom</option>
                                </select>
                                {
                                    validation.recurrenceReq && <small className="invalid-feedback">Please select job status.</small>
                                }
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Shift On Time<sup>*</sup></label>
                                <input className="form-control time-picker-default" type="time" placeholder="Shift On Time"
                                       onChange={(e)=> {
                                           setJob(prevState => ({
                                               ...prevState,
                                               shiftOn : e.target.value
                                           }));
                                       }}
                                       value={job?.shiftOn}
                                       required/>
                                {
                                    !validateTime(job.shiftOn) && <small className="invalid-feedback">Please insert valid shift on time.</small>
                                }
                            </div>

                            <div className="form-group col-6">
                                <label>Shift Off Time<sup>*</sup></label>
                                <input className="form-control time-picker-default" type="time" placeholder="Shift Off Time"
                                       onChange={(e)=> {
                                           setJob(prevState => ({
                                               ...prevState,
                                               shiftOff : e.target.value
                                           }));
                                       }}
                                       value={job?.shiftOff}
                                       required/>
                                {
                                    !validateTime(job.shiftOff) && <small className="invalid-feedback">Please insert valid shift off time.</small>
                                }
                                {
                                    validateTime(job.shiftOn) && validateTime(job.shiftOff) &&
                                    !ValidateShifts(job.shiftOn, job.shiftOff) && <small className="invalid-feedback">Invalid Shift</small>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Address<sup>*</sup></label>
                        <textarea className="form-control "  required
                                  value={job?.address}
                                  onChange={(e)=> {
                            setJob(prevState => ({
                                ...prevState,
                                address : e.target.value
                            }));
                            setValidation(prevState => ({
                                ...prevState,
                                addressReq : !e.target.value
                            }));
                        }}/>
                        {
                            validation.addressReq && <small className="invalid-feedback">The address is required.</small>
                        }
                    </div>
                    <div className="form-group">
                        <label>Locations<sup>*</sup></label>
                        <div className="input-group">
                            <input type="text" className="form-control" readOnly={true} value={modifiedLocationString()}
                                   onClick={()=> {
                                       (isEdit && editedJob) ?
                                           history.push(`#jobs/schedule-job/edit?id=${jobID}#add-location`) :
                                           history.push('#jobs/schedule-job#add-location');
                                   }}
                            />
                                <div className="input-group-append">
                                        <span className="input-group-text btn bg-primary btn-primary " id="basic-addon2">
                                                <span><img width="24px" height="24px" src={mapIcon}
                                                           alt="map icon for location popup"
                                                    onClick={() => {
                                                        (isEdit && editedJob) ?
                                                            history.push(`#jobs/schedule-job/edit?id=${jobID}#map-view`) :
                                                            history.push('#jobs/schedule-job#map-view');
                                                    }}
                                                /></span>
                                        </span>
                                </div>
                        </div>
                    </div>

                    <div className="form-group bg-light border rounded ">
                        <div className="mt-1 mx-2">
                            <label>Assigning employees</label>
                            <MultiSelect
                                options={emails}
                                value={selectedEmployees}
                                onChange={setSelectedEmployees}
                                labelledBy="Select"
                            />
                            <br/>
                    </div>
                </div>
            </div>
        </div>
        </form>

            <div className="d-flex justify-content-end">
                {
                    !isEdit && <button type="reset" className="btn btn-danger mr-3"
                                       onClick={() => onClear()}
                    >Clear</button>
                }
                <button type="button" className="btn btn-primary"
                        onClick={() => {onSubmit()}}
                        disabled={processing}
                >{isEdit ? "Update" : "Schedule"}</button>
            </div>

            <Location onLocationChange={(val : ILocation) =>
                    {
                        setJob(prevState => ({
                            ...prevState,
                            locations : val
                        }));
                    }}
                      initLocation={job.locations}
                      isOpen={((isEdit && editedJob && location.hash === `#jobs/schedule-job/edit?id=${jobID}#add-location`)
                          || (location.hash === "#jobs/schedule-job#add-location"))}
            />

            <AddDays onDaysChange={(val : string[]) => {
                setRecurrence("Custom");
                setJob(prevState => ({
                    ...prevState,
                    days : val as string[]
                }))}}
                     initDays={job.days}
                isOpen={((isEdit && editedJob && location.hash === `#jobs/schedule-job/edit?id=${jobID}#add-recurrence-day`)
                    || (location.hash === "#jobs/schedule-job#add-recurrence-days"))}
            />

            {
                ((isEdit && editedJob && location.hash === `#jobs/schedule-job/edit?id=${jobID}#map-view`)
                    || (location.hash === "#jobs/schedule-job#map-view")) &&
                <MapView lat={job?.locations?.lat4 || 0} lon={job?.locations?.lon4 || 0}/>
            }
        </div>}
        </>
    )
}
