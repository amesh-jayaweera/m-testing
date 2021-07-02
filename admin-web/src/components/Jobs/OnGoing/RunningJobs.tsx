import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {getRunningJobs} from "../../../store/actions/tablesActions";
import {IJobRunning} from "../../../type";

function RunningJob({title, jobID, shiftOn, shiftOff, address, employee} : {title : string,jobID : string, shiftOn : string, shiftOff : string , address : string
    employee : any}) {
    return (
        <li>
            <div
                className="list-item-dash pt-1 px-2 d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="dash-list-img img-fluid rounded-circle border border-light bg-dpurple"/>
                    <div className="list-job-details ml-4">
                        <p className="p-0 m-0 list-job-topic">{title}</p>
                        <div className="p-0 m-0 list-job-details">{address}</div>
                        <div className="p-0 m-0 list-job-details">{`Shift : ${shiftOn} - ${shiftOff}`}</div>
                    </div>
                </div>

                <div>
                    <div className="list-job-id">{`${employee?.firstName} ${employee?.lastName}`}</div>
                    <div className="list-job-id">{employee?.email}</div>
                </div>
            </div>
            <hr/>
        </li>
    )
}

export function RunningJobs() {

    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.runningJobs);

    useEffect(() => {
        dispatch(getRunningJobs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
            <div className="card-box height-100-p pd-20 ">
                <div className="details-cards ">
                    <div className="row no-gutters dash-list-header justify-content-between align-items-center">
                        <h5>Running Jobs</h5>
                    </div>
                    <hr className="custom-hr"/>
                        <ul className="running-jobs">
                            {
                                data && data.map((job : IJobRunning) => {
                                    return (
                                        <RunningJob title={job.title} address={job.address} jobID={job.jobId}
                                                      shiftOff={job.shiftOn}
                                                     shiftOn={job.shiftOff} key={job.jobId} employee={job.employee}/>
                                    )
                                })
                            }
                        </ul>
                </div>
            </div>
    )
}
