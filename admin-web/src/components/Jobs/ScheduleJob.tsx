import React, {useEffect, useState} from "react";
import mapIcon from "../../resources/icons/map_icon.svg";
import MultiSelect from "react-multi-select-component";
import {Location} from "./Common/Popup/Location";
import {useHistory, useLocation} from "react-router";
import {AddDays} from "./Common/Popup/AddDays";

export function ScheduleJob() {

    const location = useLocation();
    const history = useHistory();

    const options = [
        { label: "ameshmbjyw97@gmail.com", value: "ameshmbjyw97@gmail.com" },
        { label: "hiruni97@gmail.com", value: "hiruni97@gmail.com" },
    ];

    const [selected, setSelected] = useState([]);
    const [recurrence, setRecurrence] = useState<string>();

    return (
        <div className="pd-20 card-box mb-30">
        <form className="needs-validation">
            <div className="row">
                <div className="col-md-6">

                    <div className="form-group">
                        <label>Job Title<sup>*</sup></label>
                        <input className="form-control" type="text" placeholder="Job Title" required/>
                        <small className="invalid-feedback">The job title is required.</small>
                    </div>

                    <div className="form-group">
                        <label>Job Category<sup>*</sup></label>
                        <select className="custom-select">
                            <option defaultValue="None">Select Job Category</option>
                            <option value="Cleaning Service">Cleaning Service</option>
                            <option value="Facility Management">Facility Management</option>
                            <option value="Body Corporate Service">Body Corporate Service</option>
                            <option value="Security Service">Security Service</option>
                        </select>
                        <small className="invalid-feedback">Please Select Job Category.</small>
                    </div>

                    <div className="form-group">
                        <label>
                            Job Description
                            <sup>*</sup>
                        </label>
                        <textarea className="form-control " required></textarea>
                        <small className="invalid-feedback">The description is required</small>
                    </div>

                    <div className="form-group">
                        <div className="row">

                            <div className="form-group col-6">
                                <label>
                                    Starting Date
                                    <sup>*</sup>
                                </label>
                                <input className="form-control  date-picker" placeholder="Starting Date" type="date" required/>
                                <small className="invalid-feedback">The job starting date is required.</small>
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
                                <small className="invalid-feedback">Please select job status.</small>
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="form-group col-6">
                                <label>Shift On Time<sup>*</sup></label>
                                <input className="form-control time-picker-default" type="time" placeholder="Shift On Time" required/>
                                <small className="invalid-feedback">Please insert shift on time.</small>
                            </div>

                            <div className="form-group col-6">
                                <label>Shift Off Time<sup>*</sup></label>
                                <input className="form-control time-picker-default" type="time" placeholder="Shift Off Time" required/>
                                <small className="invalid-feedback">Please insert shift off time.</small>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Address<sup>*</sup></label>
                        <textarea className="form-control "  required></textarea>
                        <small className="invalid-feedback">The address is required.</small>
                    </div>
                    <div className="form-group">
                        <label>Locations<sup>*</sup></label>
                        <div className="input-group">
                            <input type="text" className="form-control" readOnly={true}/>
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
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            />
                            <br/>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-danger mr-3 ">Clear</button>
                    <button type="submit" className="btn btn-primary ">Schedule</button>
                </div>
            </div>
        </div>
        </form>
            {
                location.hash === "#jobs/schedule-new-job#add-location" &&
                <Location/>
            }
            {
                location.hash === "#jobs/schedule-new-job#add-recurrence-days" &&
                <AddDays/>
            }
        </div>
    )
}
