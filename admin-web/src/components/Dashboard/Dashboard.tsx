import React, {useEffect, useState} from "react";
import jobIcon from "../../resources/icons/job_icon.svg";
import employeeIcon from "../../resources/icons/employee_icon.svg";
import runningIcon from "../../resources/icons/running_icon.svg";
import doneIcon from "../../resources/icons/done_icon.svg";
import {UpcomingJobs} from "../Jobs/OnGoing/UpcomingJobs";
import {RunningJobs} from "../Jobs/OnGoing/RunningJobs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getEmployees, getRunningJobs, getScheduledJobs} from "../../store/actions/tablesActions";
import Skeleton from "react-loading-skeleton";
import {IJobRunning} from "../../type";

const ScheduledJobCard = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getScheduledJobs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const { loading, data } = useSelector((state: RootState) => state.scheduleJobTable);

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                {!loading ? <h1>{data.length || 0}</h1> : <Skeleton/>}
                <h5>Scheduled Jobs</h5>
            </div>
        </div>
    )
};

const EmployeeJobCard = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getEmployees());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const { loading, data } = useSelector((state: RootState) => state.employeeTable);

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                {!loading ? <h1>{data.length || 0}</h1> : <Skeleton/>}
                <h5>Employees</h5>
            </div>
        </div>
    )
};

const RunningJobCard = () => {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getRunningJobs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const { loading, data } = useSelector((state: RootState) => state.runningJobs);

  return (
      <div className="col-9 col-md-10 col-xl-9">
          <div className="m-4 card-details">
              {!loading ? <h1>{data.length || 0}</h1> : <Skeleton/>}
              <h5>Running Jobs</h5>
          </div>
      </div>
  )
};

const CompletedShifts =  () => {

    const { loading, data } = useSelector((state: RootState) => state.runningJobs);
    const [count, setCount] = useState<number>();

    useEffect(()=> {
        let c = 0;
        for(let i=0; i < (data as IJobRunning[]).length; i++) {
            const temp  = data[i] as IJobRunning;
            if(temp.status.status === 'COMPLETED') {
                c += 1;
            }
        }
        setCount(c);
    },[data]);

    return (
        <div className="col-9 col-md-10 col-xl-9">
            <div className="m-4 card-details">
                {!loading ? <h1>{count || 0}</h1> : <Skeleton/>}
                <h5>Completed Shifts </h5>
            </div>
        </div>
    )
};

export function Dashboard() {

    return (
        <div className="pd-ltr-20">
            <div className="row">
                <div className="col-xl-3 mb-30">
                    <div className="card-box height-100-p widget-style1">
                        <div className="row no-gutters h-100">
                            <ScheduledJobCard/>
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
                            <EmployeeJobCard/>
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
                            <RunningJobCard/>
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
                            <CompletedShifts/>
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
