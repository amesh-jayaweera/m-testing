import React, {useEffect, useState} from "react";
import mapIcon from "../../resources/icons/map_icon.svg";
import MultiSelect from "react-multi-select-component";
import {Location} from "./Common/Popup/Location";
import {useHistory, useLocation} from "react-router";
import {AddDays} from "./Common/Popup/AddDays";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getAllEmployeeEmails} from "../../store/actions/employeeActions";
import {IJobForm, IJobValidation, ILocation, LoggedUser} from "../../type";
import {validateTime} from "../../util/Regex";
import {ValidateShifts} from "../../util/Validation";
import {scheduleJob} from "../../store/actions/jobSchedulingActions";
import {Failure, Success} from "../../util/Toasts";
import {
    SCHEDULE_JOB_DEFAULT,
    SCHEDULE_JOB_FAILED,
    SCHEDULE_JOB_SUCCESS,
    SCHEDULE_JOB_TITLE_ALREADY_EXISTS
} from "../../store/actionTypes";

const defaultShiftOnTime : string = "08:00";
const defaultShiftOffTime : string = "17:00";
const days : string[] = ['Mon', 'Tue', 'Wed' ,'Thu', 'Fri', 'Sat' , 'Sun'];

export function ScheduleJob() {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getAllEmployeeEmails())
    },[])
    const { emails } = useSelector((state: RootState) => state.employeeEmails);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [recurrence, setRecurrence] = useState<string>();
    const [job, setJob] = useState<IJobForm>(
        {
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
        addressReq : false
    });

    const { type, error , message } = useSelector((state: RootState) => state.scheduleJob);
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch({
            type : SCHEDULE_JOB_DEFAULT
        })
    }, [])

    useEffect(() => {
        if(type === SCHEDULE_JOB_SUCCESS) {
            Success(message as string)
            dispatch({
                type : SCHEDULE_JOB_DEFAULT
            })
        } else if(type === SCHEDULE_JOB_FAILED || type === SCHEDULE_JOB_TITLE_ALREADY_EXISTS) {
            Failure(error as string)
            dispatch({
                type : SCHEDULE_JOB_DEFAULT
            })
        }
    },[type])

    // set recurrence days
    useEffect(() => {
        if(recurrence === 'None') {
            setJob(prevState => ({
                ...prevState,
                days : []
            }))
        } else if(recurrence === 'Daily') {
            setJob(prevState => ({
                ...prevState,
                days : days
            }))
        } else if(recurrence === 'Week days') {
            setJob(prevState => ({
                ...prevState,
                days : [days[0],days[1],days[2],days[3],days[4]]
            }))
        } else if(recurrence === 'Weekend') {
            setJob(prevState => ({
                ...prevState,
                days : [days[5] , days[6]]
            }))
        }
    },[recurrence])


    function onSubmit() {
        setJob(prevState => ({
            ...prevState,
            recurrence : recurrence as string,
            assignedEmployees : selectedEmployees
        }))

        if(job.title && job.category && job.description && job.address && job.startingDate && recurrence !== "None" &&
            validateTime(job.shiftOn) && validateTime(job.shiftOff) && ValidateShifts(job.shiftOn, job.shiftOff)) {
            if(recurrence === "Custom" && job.days.length === 0) {
                history.push('#jobs/schedule-new-job#add-recurrence-days')
            } else {
                dispatch(scheduleJob(job,user as LoggedUser,() => {
                    Failure("Failed to schedule the new job. Something went wrong!");
                }));
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
            assignedEmployees : []
        }))

        setValidation(prevState => ({
            ...prevState,
            titleReq : false,
            categoryReq : false,
            descriptionReq : false,
            addressReq : false
        }))

        dispatch({
            type : SCHEDULE_JOB_DEFAULT
        })
    }

    function modifiedLocationString() {
        let location : ILocation = job.locations;
        return String(location.lat1) +
            String(location.lon1) +
            String(location.lat2) +
            String(location.lon2) +
            String(location.lat3) +
            String(location.lon3) +
            String(location.lat4) +
            String(location.lon4)
    }

    return (
        <div className="pd-20 card-box mb-30">
        <form className="needs-validation">
            <div className="row">
                <div className="col-md-6">

                    <div className="form-group">
                        <label>Job Title<sup>*</sup></label>
                        <input className="form-control" type="text" placeholder="Job Title" required
                               onChange={(e)=> {
                                   setJob(prevState => ({
                                       ...prevState,
                                       title : e.target.value
                                   }))
                                   setValidation(prevState => ({
                                       ...prevState,
                                       titleReq : !e.target.value
                                   }))
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
                            }))
                            setValidation(prevState => ({
                                ...prevState,
                                categoryReq : !e.target.value || e.target.value === "None"
                            }))
                        }}>
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
                        <textarea className="form-control " required onChange={(e)=> {
                            setJob(prevState => ({
                                ...prevState,
                                description : e.target.value
                            }))
                            setValidation(prevState => ({
                                ...prevState,
                                descriptionReq : !e.target.value
                            }))
                        }}></textarea>
                        {
                            validation.descriptionReq && <small className="invalid-feedback">The description is required</small>
                        }
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="form-group col-6">
                                <label>Starting Date<sup>*</sup></label>
                                <input className="form-control  date-picker" placeholder="Starting Date" type="date"
                                      value={job.startingDate} data-date-format="DD MMMM YYYY" required
                                       onChange={(e)=> {
                                           setJob(prevState => ({
                                               ...prevState,
                                               startingDate : e.target.value
                                           }))
                                       }}
                                />
                                {
                                    !job.startingDate && <small className="invalid-feedback">The job starting date is required.</small>
                                }
                            </div>

                            <div className="form-group col-6">
                                <label>Job Status<sup>*</sup></label>
                                <select className="custom-select" onChange={(e) => {
                                    setRecurrence(e.target.value)
                                    if(e?.target?.value?.trim() === 'Custom') {
                                        history.push('#jobs/schedule-new-job#add-recurrence-days')
                                    }
                                }}>
                                    <option defaultValue="None">Select Job Status</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Week days">Week days</option>
                                    <option value="Weekend">Weekend</option>
                                    <option value="Custom">Custom</option>
                                </select>
                                {
                                    recurrence?.trim() === "None" && <small className="invalid-feedback">Please select job status.</small>
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
                                           }))
                                       }}
                                       value={job.shiftOn}
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
                                           }))
                                       }}
                                       value={job.shiftOff}
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
                        <textarea className="form-control "  required onChange={(e)=> {
                            setJob(prevState => ({
                                ...prevState,
                                address : e.target.value
                            }))
                            setValidation(prevState => ({
                                ...prevState,
                                addressReq : !e.target.value
                            }))
                        }}></textarea>
                        {
                            validation.addressReq && <small className="invalid-feedback">The address is required.</small>
                        }
                    </div>
                    <div className="form-group">
                        <label>Locations<sup>*</sup></label>
                        <div className="input-group">
                            <input type="text" className="form-control" readOnly={true} value={modifiedLocationString()} />
                                <div className="input-group-append">
                                        <span className="input-group-text btn bg-primary btn-primary " id="basic-addon2">
                                                <span><img width="24px" height="24px" src={mapIcon}
                                                           alt="map icon for location popup"
                                                    onClick={() => {history.push('#jobs/schedule-new-job#add-location')}}
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

                <div className="d-flex justify-content-end">
                    <button className="btn btn-danger mr-3"
                        onClick={() => onClear()}
                    >Clear</button>
                    <button type="button" className="btn btn-primary "
                        onClick={() => onSubmit()}
                    >Schedule</button>
                </div>

            </div>
        </div>
        </form>
            {
                location.hash === "#jobs/schedule-new-job#add-location" &&
                <Location onLocationChange={(val : ILocation) => {
                    setJob(prevState => ({
                        ...prevState,
                        locations : val
                    }))
                }}
                    initLocation={job.locations}
                />
            }
            {
                location.hash === "#jobs/schedule-new-job#add-recurrence-days" &&
                <AddDays onDaysChange={(val : string[]) => {
                    setRecurrence("Custom");
                    setJob(prevState => ({
                        ...prevState,
                        days : val as string[]
                    }))}}
                         initDays={job.days || []}
                />
            }
        </div>
    )
}