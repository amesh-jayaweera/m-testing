import React from "react";
import defaultProfile from "../../../resources/images/profile-placeholder.svg";

export const PROFILE_ADMIN = "PROFILE_ADMIN";
export const PROFILE_EMPLOYEE = "PROFILE_EMPLOYEE";

export function EmployeeView({actionType, myProfile} : {actionType : string, myProfile : boolean}) {

    return (
        <div className="mb-30">
            <div className="row">
                <div className="col-lg-9 mb-30">
                    <div className="card-box">
                        <div className="row pd-t-30-l-30-r-30-b-0">
                            <div className="col-xl-4">
                                <div className="profile-photo img-fluid ">
                                    <img className="avatar-photo img-fluid shadow-sm border border-dark"
                                         src={defaultProfile} alt="Admin Profile Identity"/>
                                </div>
                                <h6 className="text-center text-muted">[Employee id]</h6>
                                <h5 className="text-center h5 mb-0">Ross C. Lopez</h5>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label htmlFor="">First Name </label>
                                    <input className="form-control" type="text" placeholder="First Name" readOnly={!myProfile}/>
                                </div>
                                <div className="form-group">
                                    <label>Last Name </label>
                                    <input className="form-control " type="text" placeholder="Last Name" readOnly={!myProfile}/>
                                </div>
                                <div className="form-group" id='datetimepicker'>
                                    <label>Birthday </label>
                                    <input id="visit" className="form-control  date-picker" readOnly={!myProfile}
                                           placeholder="Select Birthday" type="date"/>
                                </div>
                                <div className="form-group">
                                    <label>Gender </label>
                                    <select className="custom-select" disabled={!myProfile}>
                                        <option value="None">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label>Email </label>
                                    <input className="form-control" placeholder="employee@example.com" type="email"
                                           readOnly={!myProfile}/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input className="form-control" placeholder="+61xxxxxxxxx" type="text" readOnly={!myProfile}/>
                                </div>
                                {
                                    actionType === PROFILE_EMPLOYEE &&
                                    <div className="form-group">
                                        <label>Position </label>
                                        <input className="form-control" placeholder="Position" type="text"
                                               readOnly={true}/>
                                    </div>
                                }
                                <div className="form-group">
                                    <label>Registered Date </label>
                                    <input className="form-control " type="text" placeholder={"Registered Date"} readOnly={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-column flex-lg-row txt-area-section">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea className="form-control" readOnly={!myProfile}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Other Details</label>
                                    <textarea className="form-control" readOnly={!myProfile}/>
                                </div>
                            </div>
                        </div>
                        {
                            myProfile &&
                            <div className="d-flex justify-content-end pd-t-0-l-30-r-30-b-30 pt-2">
                                <button type="reset" className="btn btn-secondary mr-3">Reset</button>
                                <button className="btn btn-primary ">Update</button>
                            </div>
                        }
                    </div>
                </div>

                {
                    actionType === PROFILE_ADMIN &&
                    <div className="col-lg-3 mb-30">
                    <div className="card-box pd-30">
                        <h6>Scheduled jobs :</h6>
                        <div className="d-flex justify-content-center flex-lg-column">
                            <div className="pr-2 pr-lg-0 pt-lg-2">
                                <div className="bg-dgreen job-hours-card img-fluid">
                                    <div className="d-flex flex-wrap text-white justify-content-center">
                                        <div className="hours-item">
                                            <h1>12</h1>
                                            <h6>Jobs</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    actionType === PROFILE_EMPLOYEE &&
                    <div className="col-lg-3 mb-30">
                        <div className="card-box pd-30">
                            <h6>Worked hours</h6>
                            <div className="d-flex justify-content-center flex-lg-column">
                                <div className="pr-2 pr-lg-0 pt-lg-2">
                                    <h6 className="">Today :</h6>
                                    <div className="bg-dgreen hours-card img-fluid">
                                        <div className="d-flex flex-wrap text-white justify-content-center">
                                            <div className="hours-item">
                                                <h1>01</h1>
                                                <h6>Hours</h6>
                                            </div>
                                            <div className="minute-item">
                                                <h1>25</h1>
                                                <h6>Minutes</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-2 pl-lg-0 pt-lg-3">
                                    <h6 className="">This month :</h6>
                                    <div className="bg-dyellow hours-card img-fluid">
                                        <div className="d-flex flex-wrap text-muted justify-content-center">
                                            <div className="hours-item">
                                                <h1>01</h1>
                                                <h6>Hours</h6>
                                            </div>
                                            <div className="minute-item">
                                                <h1>25</h1>
                                                <h6>Minutes</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}