import React, {useEffect, useState} from "react";
import mapIcon from "../../resources/icons/map_icon.svg";
import {IJob, ILocation} from "../../type";
import {useHistory, useLocation} from "react-router";
import {fire} from "../../index";
import Skeleton from "react-loading-skeleton";
import {MapView} from "../Common/MapViewModal/MapView";

export function JobView() {

    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(true);
    const [jobId, setJobId] = useState<string>();
    const [job, setJob] = useState<IJob>();
    const [createdDate, setCreatedDate] = useState<Date>();

    useEffect(()=> {
        const docID = location.hash.split('#jobs/schedule-job/view?id=');
        if(docID.length >= 2) {
            fire.firestore().collection("jobs").doc(docID[1].trim()).get().then((doc) => {
                if(doc.exists) {
                    setJobId(doc.id);
                    let data : IJob = doc.data() as IJob;
                    setJob(data);
                    setCreatedDate((data.createdDate as any).toDate().toLocaleDateString());
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

    function modifiedLocationString() {
        if(job?.locations) {
            let location : ILocation = job?.locations;
            return 'Point 1 - ' + String(location.lat1) + ',' +
                String(location.lon1) + ',\n' +
                'Point 2 - ' + String(location.lat2) + ',' +
                String(location.lon2) + ',\n' +
                'Point 3 - ' + String(location.lat3) + ',' +
                String(location.lon3) + ',\n' +
                'Point 4 - ' + String(location.lat4) + ',' +
                String(location.lon4);
        }
        return "";
    }


    return (
        <>
            <div className="pd-20 card-box mb-30">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Job Title </label>
                            <div className="wrapping">{!loading ? job?.title : <Skeleton/>}</div>
                        </div>
                        <div className="form-group">
                            <label>Created Date </label>
                            <div className="wrapping">{!loading ? createdDate : <Skeleton/>}</div>
                        </div>
                        <div className="form-group">
                            <label>Job Category </label>
                            <div className="wrapping">{!loading ? job?.category : <Skeleton/>}</div>
                        </div>
                        <div className="form-group">
                            <label>Job Description </label>
                            <div className="wrapping">{!loading ? job?.description : <Skeleton/>}</div>
                        </div>
                        <div className="form-group ">
                            <div className="row ">
                                <div className="form-group col-sm-6 ">
                                    <label>Started Date </label>
                                    <div className="wrapping ">{!loading ? job?.startingDate : <Skeleton/>}</div>
                                </div>
                                <div className="form-group col-sm-6 ">
                                    <label>Job Recurrence </label>
                                    <div className="wrapping ">{!loading ? job?.recurrence : <Skeleton/>}</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="row ">
                                <div className="form-group col-sm-6 ">
                                    <label>Shift On Time </label>
                                    <div className="wrapping">{!loading ? job?.shiftOn : <Skeleton/>}</div>
                                </div>
                                <div className="form-group col-sm-6 ">
                                    <label>Shift off time </label>
                                    <div className="wrapping">{!loading ? job?.shiftOff : <Skeleton/>}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 ">
                        <div className="form-group">
                            <label>Address </label>
                            <div className="wrapping">{!loading ? job?.address : <Skeleton/>}</div>
                        </div>
                        <div className="form-group ">
                            <label>Locations </label>
                            <div className="form-group">
                                <div className="wrapping location-view">{!loading ? modifiedLocationString() : <Skeleton/>}</div>
                                {loading ? <Skeleton/>
                                    :
                                    (<button className="btn btn-primary float-right mb-2 mt-2"
                                        onClick={()=> {history.push(`#jobs/schedule-job/view?id=${jobId}#map-view`);}}
                                    >
                                        <span>
                                            <img width="24px " height="24px " src={mapIcon} alt="open map icon"/>
                                        </span>
                                    </button>)
                                }
                            </div>
                        </div>

                        <div className="clearfix"/>
                        <br/>
                        <br/>
                        <div className="form-group bg-light border rounded ">
                            <div className="mt-1 mx-2 ">
                                <label>Assigned Employees</label>
                                <div className="input-group"/>
                            </div>
                            <div className="row flex-wrap mx-auto p-2 justify-content-center ">
                                {
                                    loading && <Skeleton count={10}/>
                                }
                                {
                                    !loading && job?.assignedEmployees &&
                                    job.assignedEmployees.map((employee: any) => {
                                        return (
                                            <div className="added-seller border p-1 m-2 rounded d-flex ">
                                                <p className="my-auto pl-1 ">{employee['value']}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                location.hash === `#jobs/schedule-job/view?id=${jobId}#map-view` &&
                <MapView lat={job?.locations?.lat4 || 0} lon={job?.locations?.lon4 || 0}/>
            }
        </>
    )
}
