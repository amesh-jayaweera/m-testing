import React, {useEffect} from "react";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {getTodayJobs} from "../../../store/actions/tablesActions";
import {IJobRecurrence} from "../../../type";
import Skeleton from "react-loading-skeleton";

function UpComingJob({title, jobID, shiftOn, shiftOff, address, numberOfEmployees} : {title : string,jobID : string, shiftOn : string, shiftOff : string , address : string
numberOfEmployees : number}) {
    return (
        <li>
            <div
                className="list-item-dash pt-1 px-2 d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="dash-list-img img-fluid rounded-circle border border-light bg-bblue"/>
                    <div className="list-job-details ml-4">
                        <p className="p-0 m-0 list-job-topic">{title}</p>
                        <div className="p-0 m-0 list-job-details">{address}</div>
                        <div className="p-0 m-0 list-job-details">{`Shift : ${shiftOn} - ${shiftOff}`}</div>
                    </div>
                </div>

                <div>
                    <p className="badge custom-badge float-right badge-dyellow">{numberOfEmployees}</p>
                </div>
            </div>
            <hr/>
        </li>
    )
}

export function UpcomingJobs() {

    const dispatch = useDispatch();
    const { loading, data } = useSelector((state: RootState) => state.recurrenceJobs);

    useEffect(() => {
        dispatch(getTodayJobs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const history = useHistory();

    return (
                <div className="card-box height-100-p pd-20 ">
                    <div className="details-cards ">
                        <div className="row no-gutters dash-list-header justify-content-between align-items-center">
                            <h5>Today Jobs</h5>
                            <div className="d-flex">
                                <button className="btn btn-primary schedule-btn  mr-5" onClick={()=>{history.push("#jobs/schedule-job");}}>Schedule</button>
                            </div>
                        </div>
                        <hr className="custom-hr"/>
                            <ul className="running-jobs">
                                {
                                    !loading && data && data.map((job : IJobRecurrence) => {
                                        return (
                                            <UpComingJob title={job.title} address={job.address} jobID={job.jobId}
                                                          numberOfEmployees={job.employeeCount} shiftOff={job.shiftOn}
                                                          shiftOn={job.shiftOff} key={`${job.jobId}-${job.datetime}`}/>
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
