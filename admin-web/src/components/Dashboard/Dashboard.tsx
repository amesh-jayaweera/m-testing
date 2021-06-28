import React from "react";
import jobIcon from "../../resources/icons/job_icon.svg";
import employeeIcon from "../../resources/icons/employee_icon.svg";
import runningIcon from "../../resources/icons/running_icon.svg";
import doneIcon from "../../resources/icons/done_icon.svg";
import {UpcomingJobs} from "../Jobs/OnGoing/UpcomingJobs";
import {RunningJobs} from "../Jobs/OnGoing/RunningJobs";

export function Dashboard() {

    return (
        <div className="pd-ltr-20">
            <div className="row">
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <div className="col-9 col-md-10 col-xl-9">
                                <div className="m-4 card-details">
                                    <h1>144</h1>
                                    <h5>Scheduled Jobs</h5>
                                </div>
                            </div>
                            <div className="col-3 col-md-2 col-xl-3 bg-dblue card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={jobIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <div className="col-9 col-md-10 col-xl-9">
                                <div className="m-4 card-details">
                                    <h1>54</h1>
                                    <h5>Employees</h5>
                                </div>
                            </div>
                            <div className="col-3 col-md-2 col-xl-3 bg-dcyan card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={employeeIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <div className="col-9 col-md-10 col-xl-9">
                                <div className="m-4 card-details">
                                    <h1>12</h1>
                                    <h5>Running Jobs</h5>
                                </div>
                            </div>
                            <div className="col-3 col-md-2 col-xl-3 bg-dpurple card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={runningIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <div className="col-9 col-md-10 col-xl-9">
                                <div className="m-4 card-details">
                                    <h1>23</h1>
                                    <h5>Completed Shifts </h5>
                                </div>
                            </div>
                            <div className="col-3 col-md-2 col-xl-3 bg-dgreen card-item d-flex justify-content-center">
                                <div className="m-3 my-auto">
                                    <img src={doneIcon} width="50px" height="50px" alt="job-icon"
                                         srcSet=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row ">
                <div className="col-xl-6 mb-30 ">
                    <UpcomingJobs/>
                </div>

                <div className="col-xl-6 mb-30">
                    <RunningJobs/>
                </div>
            </div>
        </div>
    );
}
