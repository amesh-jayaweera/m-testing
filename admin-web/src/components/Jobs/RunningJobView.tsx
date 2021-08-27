import React, {useEffect, useState} from "react";
import imagePlaceHolder from '../../resources/images/u-placeholder.svg';
import {useHistory, useLocation} from "react-router";
import {Feedback, IJobRunning, Timeline} from "../../type";
import {fire} from "../../index";
import Skeleton from "react-loading-skeleton";

export function RunningJobView({isHistory} : {isHistory : boolean}) {

    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(true);
    const [jobId, setJobId] = useState<string>();
    const [job, setJob] = useState<IJobRunning>();
    const [date, setDate] = useState<any>();

    useEffect(()=> {
        const docID = !isHistory ? location.hash.split('#jobs/running/job/view?id=')
            : location.hash.split('#jobs/running/history/job/view?id=');
        if(docID.length >= 2) {
            fire.firestore().collection("running_jobs").doc(docID[1].trim()).get().then((doc) => {
                if(doc.exists) {
                    let data : IJobRunning = doc.data() as IJobRunning;
                    setJob(data);
                    setJobId(data.jobId);
                    setDate(data.date);
                   // setDate((data.datetime as any).toDate().toLocaleDateString());
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="mb-30">
            <div className="row">
                <div className="col-lg-9">
                    <div className="card-box">
                        <div className="row pd-t-20-l-30-r-30-b-0 mb-30 pb-15">
                            <h6 className="pl-2">Shift Details</h6>
                            <div className="row no-gutters w-100">
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label htmlFor="">Job Id</label>
                                        <div className="wrapping">{!loading ? jobId : <Skeleton/>}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Shift</label>
                                        <div className="wrapping">{!loading ? `From ${job?.shiftOn} to ${job?.shiftOff}`
                                            : <Skeleton/>}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <div className="wrapping">{!loading ? job?.title : <Skeleton/>}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <div className="wrapping">{!loading ? job?.address : <Skeleton/>}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters w-100">
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label htmlFor="">Employee Email (ID) </label>
                                        <div className="wrapping">{!loading ? job?.employee.email : <Skeleton/>}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Shift On Time </label>
                                        <div className="wrapping">{!loading ? job?.status.onTime : <Skeleton/>}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <div className="wrapping">{!loading ? job?.address : <Skeleton/>}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label>Employee Name </label>
                                        <div className="wrapping">{!loading ? `${job?.employee.firstName} ${job?.employee.lastName}`
                                            : <Skeleton/>}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Shift Off Time </label>
                                        <div className="wrapping">{!loading ? job?.status.offTime : <Skeleton/>}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <div className="wrapping">{!loading ? date : <Skeleton/>}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="row w-100 no-gutters">
                                <label className="ml-1">Feedbacks</label>
                                <div className="d-flex p-1 flex-wrap">
                                    {
                                        loading ?
                                            <Skeleton className={"img-fluid eve-images shadow-sm m-1 feedback-images"}/>
                                            :
                                            job && job.status.feedback &&
                                            job.status.feedback.map((val : Feedback) => {
                                                return (
                                                    <img className="img-fluid eve-images shadow-sm m-1 feedback-images"
                                                         src={val.url || imagePlaceHolder} alt="eve-images"/>
                                                )
                                            })
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-lg-3 mb-30">
                    <div className="card-box pd-30">
                        <h6>Tracking Details</h6>
                        <div className="d-flex justify-content-center flex-lg-column">
                            <div className="pr-2 pr-lg-0 pt-lg-2">
                                <h6 className="">Location In Time </h6>
                                <div className="bg-dgreen hours-card img-fluid">
                                    <div className="d-flex flex-wrap text-white justify-content-center">
                                        <div className="hours-item">
                                            <h1>06</h1>
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
                                <h6 className="">Location Out Time </h6>
                                <div className="badge-dred hours-card img-fluid">
                                    <div className="d-flex flex-wrap text-white justify-content-center">
                                        <div className="hours-item">
                                            <h1>00</h1>
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

                <div className=" mb-30 col-xl-9 view-table">
                    <div className="card-box">
                        <div className="pd-20 ">
                            <h4 className="text-blue h4 ">Tracking History</h4>
                        </div>
                        <div className="tableFixHead">
                            <table className="table table-hover table-responsive-md">
                                <thead className="thead-light pd-20">
                                <tr>
                                    <th>Time</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody className="pd-20">
                                {!loading && job &&
                                        job.status.timline &&
                                        job.status.timline.map((time : Timeline) => {
                                            return (
                                                <tr key={time.time}>
                                                    <td>{(time.time as any).toDate().toLocaleTimeString()}</td>
                                                    <td>{time.lat}</td>
                                                    <td>{time.lon}</td>
                                                    <td>
                                                        {
                                                            time.status ? <div className="badge text-dark badge-dgreen">Live</div> :
                                                                <div className="badge text-dark badge-dred">Offline</div>
                                                        }

                                                    </td>
                                                </tr>
                                            )
                                        })
                                }
                                {
                                    loading &&
                                        <>
                                            <tr>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                            </tr>
                                            <tr>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                            </tr>
                                            <tr>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                            </tr>
                                            <tr>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                                <td><Skeleton/></td>
                                            </tr>
                                        </>
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="view-table mb-30 col-xl-9">
                    <div className="card-box">
                        <div className="pd-20 ">
                            <h4 className="text-blue h4 ">Tracking</h4>
                        </div>
                        <div className="map-view-container">
                            <div>
                                <iframe
                                    src={`https://maps.google.com/maps?q=${job?.status.lat},${job?.status.lon}&hl=es;z=14&amp&output=embed`}
                                    width="100%" height="450"
                                    loading="lazy" className="iframe-map" title={"Running Job Current Location"}></iframe>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
