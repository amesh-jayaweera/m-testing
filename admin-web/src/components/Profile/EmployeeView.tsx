import React, {useEffect, useState} from "react";
import defaultProfile from "../../resources/images/profile-placeholder.svg";
import firebase from "firebase";
import {IEmployee} from "../../type";
import {useHistory, useLocation} from "react-router";
import Skeleton from "react-loading-skeleton";

export const PROFILE_ADMIN = "PROFILE_ADMIN";
export const PROFILE_EMPLOYEE = "PROFILE_EMPLOYEE";
export const MY_PROFILE = "MY_PROFILE";

export function EmployeeView({actionType, myProfile} : {actionType : string, myProfile : boolean}) {

    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState<boolean>(false);
    const [docID, setDocID] = useState<string>();
    const [employee, setEmployee] = useState<IEmployee>();

    // load employee data
    useEffect(() => {
            setLoading(true);
            const db = firebase.firestore();
            const path = location.hash;
            let id : any;
            let dbRef : string = "";
            if(actionType === PROFILE_ADMIN) {
                dbRef = "admins";
                id = path.split('#admin/view?id=');
            } else if(actionType === PROFILE_EMPLOYEE) {
                dbRef = "employees";
                id = path.split('#employee/view?id=');
            } else if(actionType === MY_PROFILE) {
                dbRef = "admins";
                id = path.split('#admin/my-profile?id=');
            } else {
                // not found
            }
            if(dbRef && id.length >= 2) {
                setDocID(id[1].trim());
                db.collection(dbRef).doc(id[1].trim()).get().then((doc) => {
                    if(doc.exists) {
                        let emp : IEmployee  = doc.data() as IEmployee;
                        setEmployee(emp);
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

    if(loading) {
        return (
            <Skeleton count={20} duration={20}/>
        )
    }

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
                                <h6 className="text-center text-muted">{employee?.email}</h6>
                                <h5 className="text-center h5 mb-0">{`${employee?.firstName} ${employee?.lastName}`}</h5>
                            </div>
                            <div className="col-xl-4">
                                <div className="form-group">
                                    <label htmlFor="">First Name </label>
                                    <input className="form-control" type="text" placeholder="First Name"
                                           value={employee?.firstName}
                                           readOnly={!myProfile}/>
                                </div>
                                <div className="form-group">
                                    <label>Last Name </label>
                                    <input className="form-control " type="text" placeholder="Last Name"
                                           value={employee?.lastName}
                                           readOnly={!myProfile}/>
                                </div>
                                <div className="form-group" id='datetimepicker'>
                                    <label>Birthday </label>
                                    <input id="visit" className="form-control  date-picker"
                                           value={employee?.birthday}
                                           readOnly={!myProfile}
                                           placeholder="Select Birthday" type="date"/>
                                </div>
                                <div className="form-group">
                                    <label>Gender </label>
                                    <select className="custom-select" disabled={!myProfile} value={employee?.gender}>
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
                                           value={employee?.email}
                                           readOnly={true}/>
                                </div>
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input className="form-control" placeholder="+61xxxxxxxxx" type="text"
                                           value={employee?.contactNumber}
                                           readOnly={!myProfile}/>
                                </div>
                                {
                                    actionType === PROFILE_EMPLOYEE &&
                                    <div className="form-group">
                                        <label>Position </label>
                                        <input className="form-control" placeholder="Position" type="text"
                                               value={employee?.position}
                                               readOnly={true}/>
                                    </div>
                                }
                                <div className="form-group">
                                    <label>Registered Date </label>
                                    <input className="form-control " type="text" placeholder={"Registered Date"}
                                           value={(employee?.createdDateTime as any)?.toDate()?.toLocaleDateString()}
                                           readOnly={true}/>
                                </div>
                            </div>
                        </div>
                        <div className="row flex-column flex-lg-row txt-area-section">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea className="form-control" readOnly={!myProfile} value={employee?.address}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Other Details</label>
                                    <textarea className="form-control" readOnly={!myProfile} value={employee?.otherDetails}/>
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
                        <h6>Scheduled Jobs :</h6>
                        <div className="d-flex justify-content-center flex-lg-column">
                            <div className="pr-2 pr-lg-0 pt-lg-2">
                                <div className="bg-dgreen job-hours-card img-fluid">
                                    <div className="d-flex flex-wrap text-white justify-content-center">
                                        <div className="hours-item">
                                            <h1>3</h1>
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
                            <h6>Worked Hours</h6>
                            <div className="d-flex justify-content-center flex-lg-column">
                                <div className="pr-2 pr-lg-0 pt-lg-2">
                                    <h6 className="">Today</h6>
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
                                    <h6 className="">This Month</h6>
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