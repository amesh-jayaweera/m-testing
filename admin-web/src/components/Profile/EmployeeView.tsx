import React, {useEffect, useState} from "react";
import defaultProfile from "../../resources/images/profile-placeholder.svg";
import {IEmployee, IUpdatedAdmin} from "../../type";
import {useHistory, useLocation} from "react-router";
import Skeleton from "react-loading-skeleton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {updateAdmin} from "../../store/actions/employeeActions";
import {
    ADMIN_PROFILE_UPDATE_DEFAULT,
    ADMIN_PROFILE_UPDATE_FAILED,
    ADMIN_PROFILE_UPDATE_SUCCESS
} from "../../store/actionTypes";
import {Failure, Success} from "../../util/Toasts";
import firebase from "firebase";

export const PROFILE_ADMIN = "PROFILE_ADMIN";
export const PROFILE_EMPLOYEE = "PROFILE_EMPLOYEE";
export const MY_PROFILE = "MY_PROFILE";
export const PDF_TAG : string = ".pdf";

export function EmployeeView({actionType, myProfile} : {actionType : string, myProfile : boolean}) {

    const history = useHistory();
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const [employee, setEmployee] = useState<IEmployee>({
        firstName : "",
        lastName : "",
        address : "",
        email : "",
        contactNumber : "",
        gender : "None",
        birthday : new Date().toISOString().split('T')[0],
    });
    const [validation, setValidation] = useState({
       addressReq : false,
       contactNumberReq : false
    });
    const [suspend,setSuspend] = useState<boolean>(false);
    const [policeReport, setPoliceReport] = useState<string>("");
    const [passport, setPassport] = useState<string>("");

    // load employee data
    useEffect(() => {
            setLoading(true);
            const db = firebase.firestore();
            const storage = firebase.storage();
            const path = location.hash;
            let id : any;
            let dbRef : string = "";
            let passportPath : string = "";
            let policeReportPath : string = "";
            if(actionType === PROFILE_ADMIN) {
                dbRef = "admins";
                id = path.split('#admin/view?id=');
                passportPath = "admins/passports/";
                policeReportPath = "admins/police-reports/";
            } else if(actionType === PROFILE_EMPLOYEE) {
                dbRef = "employees";
                id = path.split('#employee/view?id=');
                passportPath = "employees/passports/";
                policeReportPath = "employees/police-reports/";
            } else if(actionType === MY_PROFILE) {
                dbRef = "admins";
                id = user?.email.trim();
                passportPath = "admins/passports/";
                policeReportPath = "admins/police-reports/";
            } else {
                // not found
                history.push('#dashbord/not-found');
            }

            if(!myProfile) {
                if(dbRef && id.length >= 2) {
                    db.collection(dbRef).doc(id[1].trim()).get().then((doc) => {
                        if(doc.exists) {
                            let emp : IEmployee  = doc.data() as IEmployee;
                            setEmployee(emp);
                            setSuspend(emp?.suspend || false);
                            passportPath = passportPath + emp.email.trim() + PDF_TAG;
                            policeReportPath = policeReportPath + emp.email.trim() + PDF_TAG;
                            storage.ref(passportPath).getDownloadURL()
                                .then((url) => {
                                    setPassport(url);
                                })
                                .catch(() => {
                                    // Handle any errors
                                });
                            storage.ref(policeReportPath).getDownloadURL()
                                .then((url) => {
                                    setPoliceReport(url);
                                })
                                .catch(() => {
                                    // Handle any errors
                                });
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
            } else {
                db.collection(dbRef).doc(id).get().then((doc) => {
                    if(doc.exists) {
                        let emp : IEmployee  = doc.data() as IEmployee;
                        setEmployee(emp);
                        setSuspend(emp?.suspend || false);
                        passportPath = passportPath + emp.email.trim() + PDF_TAG;
                        policeReportPath = policeReportPath + emp.email.trim() + PDF_TAG;
                        storage.ref(passportPath).getDownloadURL()
                            .then((url) => {
                                setPassport(url);
                            })
                            .catch(() => {
                                // Handle any errors
                            });
                        storage.ref(policeReportPath).getDownloadURL()
                            .then((url) => {
                                setPoliceReport(url);
                            })
                            .catch(() => {
                                // Handle any errors
                            });
                        setLoading(false);
                    } else {
                        // not found
                        setLoading(false);
                        history.push('#dashbord/not-found');
                    }
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const dispatch = useDispatch();
    const { type, message, error } = useSelector((state: RootState) => state.adminProfileUpdate);
    useEffect(() => {
        if(processing && type === ADMIN_PROFILE_UPDATE_SUCCESS) {
            Success(message as string);
            dispatch({
                type : ADMIN_PROFILE_UPDATE_DEFAULT
            });
            setProcessing(false);
        } else if(processing && type === ADMIN_PROFILE_UPDATE_FAILED) {
            Failure(error as string);
            dispatch({
                type : ADMIN_PROFILE_UPDATE_DEFAULT
            });
            setProcessing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[type, message, error]);

    function onSubmit() {

        setValidation(prevState => ({
            ...prevState,
            addressReq : !employee.address,
            contactNumberReq : !employee.contactNumber
        }));

        if(employee.address && employee.contactNumber) {
            setProcessing(true);
            // update admin profile
            let updatedAdmin : IUpdatedAdmin = {
                email : employee.email,
                address : employee.address,
                contactNumber : employee.contactNumber,
                otherDetails : employee.otherDetails
            };
            dispatch({
                type : ADMIN_PROFILE_UPDATE_DEFAULT
            });
            dispatch(updateAdmin(updatedAdmin));
        }
    }

    function onSuspend() {
        if(user?.email.trim() !== employee.email) {
            setProcessing(true);
            let userPath : string = "";
            if(actionType === PROFILE_EMPLOYEE) {
                userPath = "employees";
            } else if(actionType === PROFILE_ADMIN) {
                userPath = "admins";
            } else {
                // not found
                history.push('#dashbord/not-found');
            }

            const db = firebase.firestore();

            if(actionType === PROFILE_ADMIN || actionType === PROFILE_EMPLOYEE) {
                db.collection(userPath).doc(employee.email).set({
                    suspend : true
                },{ merge: true })
                    .then(() => {
                        setSuspend(true);
                        setEmployee(prevState => ({
                            ...prevState,
                            suspend : true
                        }));
                        Success("Employee has been suspended!");
                        setProcessing(false);
                    })
                    .catch(() => {
                        Failure("Something went wrong!");
                        setProcessing(false);
                    });
            }
        }
    }

    function onUnblock() {
        if(user?.email.trim() !== employee.email) {
            setProcessing(true);
            let userPath : string = "";
            if(actionType === PROFILE_EMPLOYEE) {
                userPath = "employees";
            } else if(actionType === PROFILE_ADMIN) {
                userPath = "admins";
            } else {
                // not found
                history.push('#dashbord/not-found');
            }

            const db = firebase.firestore();

            if(actionType === PROFILE_ADMIN || actionType === PROFILE_EMPLOYEE) {
                db.collection(userPath).doc(employee.email).set({
                    suspend : false
                },{ merge: true })
                    .then(() => {
                        setSuspend(false);
                        setEmployee(prevState => ({
                            ...prevState,
                            suspend : false
                        }));
                        Success("Employee has been unblocked!");
                        setProcessing(false);
                    })
                    .catch(() => {
                        Failure("Something went wrong!");
                        setProcessing(false);
                    });
            }
        }
    }

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
                                           readOnly={true}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name </label>
                                    <input className="form-control " type="text" placeholder="Last Name"
                                           value={employee?.lastName}
                                           readOnly={true}
                                    />
                                </div>
                                <div className="form-group" id='datetimepicker'>
                                    <label>Birthday </label>
                                    <input id="visit" className="form-control  date-picker"
                                           value={employee?.birthday}
                                           readOnly={true}
                                           type="date"/>
                                </div>
                                <div className="form-group">
                                    <label>Gender </label>
                                    <input id="gender" className="form-control  date-picker"
                                           value={employee?.gender}
                                           readOnly={true}
                                           type="text"/>
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
                                           readOnly={!myProfile}
                                           onChange={(e) => {
                                               setEmployee(prevState => ({
                                                   ...prevState,
                                                   contactNumber : e.target.value
                                               }));
                                               setValidation(prevState => ({
                                                   ...prevState,
                                                   contactNumberReq : !e.target.value
                                               }));
                                           }}
                                    />
                                    {
                                        validation.contactNumberReq &&
                                        <small className="invalid-feedback">The first name is required.</small>
                                    }
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
                                    <textarea className="form-control" readOnly={!myProfile} value={employee?.address}
                                              onChange={(e) => {
                                                  setEmployee(prevState => ({
                                                      ...prevState,
                                                       address : e.target.value
                                                  }));
                                                  setValidation(prevState => ({
                                                      ...prevState,
                                                      addressReq : !e.target.value
                                                  }));
                                              }}
                                    />
                                    {
                                        validation.addressReq &&
                                        <small className="invalid-feedback">The first name is required.</small>
                                    }
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Other Details</label>
                                    <textarea className="form-control" readOnly={!myProfile} value={employee?.otherDetails}
                                              onChange={(e) => {
                                                  setEmployee(prevState => ({
                                                      ...prevState,
                                                      otherDetails : e.target.value
                                                  }));
                                              }}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            myProfile &&
                            <div className="d-flex justify-content-end pd-t-0-l-30-r-30-b-30 pt-2">
                                <button className="btn btn-primary" onClick={()=> {onSubmit();}} disabled={processing}>Update</button>
                            </div>
                        }
                            <div className="d-flex justify-content-between pd-t-0-l-30-r-30-b-30 pt-2">
                                <div className="align-self-center">
                                    <a className={"doc-link"} href={policeReport.trim() ? policeReport : "/not-available"} target="_blank" rel="noreferrer">Police Report</a>
                                    <a className="doc-link ml-sm-3 " href={passport.trim() ? passport : "/not-available"} target="_blank" rel="noreferrer">Passport Copy</a>
                                </div>
                                {
                                    !myProfile && user?.email.trim() !== employee.email.trim() &&
                                    <button className="btn btn-danger mt-3 mt-sm-0" onClick={()=> {suspend ? onUnblock() : onSuspend();
                                }} disabled={processing}>{suspend ? "Unblock" : "Suspend"}</button> }
                            </div>
                    </div>
                </div>

                {
                    (actionType === PROFILE_ADMIN || actionType === MY_PROFILE) &&
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
