import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {getRunningJobs} from "../../../store/actions/tablesActions";
import {IJobRunning} from "../../../type";
import Skeleton from "react-loading-skeleton";
import {useHistory} from "react-router";

function RunningJob({title, shiftOn, shiftOff, employee, ON, OFF, LIVE, STATUS, action} : {title : string,jobID : string, shiftOn : string,
    shiftOff : string , address : string
    employee : any,
    ON : string, OFF : string, STATUS : string, LIVE : boolean,
    action : string
}) {

    const history = useHistory();

    return (
        <li onClick={() => {history.push(action)}} className={"running-cursor"}>
            <div className="list-item-dash pt-1 px-2 d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="list-job-details">
                        <p className="p-0 m-0 list-job-topic">{`${employee?.firstName} ${employee?.lastName}`}</p>
                        <p className="p-0 m-0 list-job-topic-title">{title}</p>
                        <div className="p-0 m-0 list-job-details">Shift : {shiftOn} - {shiftOff}</div>
                        <div className="p-0 m-0 list-job-details">Shift On : {ON}</div>
                        <div className="p-0 m-0 list-job-details">Shift Off : {OFF || "_"}</div>
                    </div>
                </div>

                <div>
                    <div className="text-right mt-2">{LIVE ? <span className="badge badge-dgreen">Live</span> :
                        <span className="badge badge-dred">Offline</span>
                    }</div>
                    <div className="text-right mt-2">{STATUS === 'COMPLETED' ? <span className="badge badge-dgreen">Completed</span> :
                        STATUS === 'ON_GOING' ? <span className="badge badge-dpurple">On Going</span> :
                            <span className="badge badge-dyellow">Not Started</span>
                    }</div>
                    <div className="list-job-id text-right running-job-email">{employee?.email}</div>

                </div>
            </div>
            <hr/>
        </li>
    )
}

export function RunningJobs() {

    const dispatch = useDispatch();
    const { loading,data } = useSelector((state: RootState) => state.runningJobs);

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
                                !loading && data && data.map((job : IJobRunning) => {
                                    return (
                                        <RunningJob title={job.title} address={job.address} jobID={job.jobId}
                                                      shiftOff={job.shiftOff}
                                                     shiftOn={job.shiftOn} key={`${job.jobId}-${job.datetime}`} employee={job.employee}
                                                    ON={job.status?.onTime || "_"} OFF={job.status?.offTime || "_"}
                                                    STATUS={job.status.status} LIVE={job.status?.live || false}
                                                    action={job.action}
                                        />
                                    )
                                })
                            }
                            {
                                loading && <Skeleton count={10} height={100}/>
                            }
                        </ul>
                </div>
            </div>
    )
}
