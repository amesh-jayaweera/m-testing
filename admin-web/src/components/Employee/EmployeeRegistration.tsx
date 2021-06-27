import React, {useEffect, useState} from "react";
import {IEmployee, IEmployeeValidation} from "../../type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {
    PASSPORT_UPLOAD_FAILED,
    PASSPORT_UPLOAD_SUCCESS, POLICE_REPORT_UPLOAD_FAILED,
    POLICE_REPORT_UPLOAD_SUCCESS, USER_ALREADY_EXISTS, USER_REGISTRATION_COMPLETED,
    USER_REGISTRATION_DEFAULT, USER_REGISTRATION_FAILED, USER_REGISTRATION_PROGRESS,
    USER_REGISTRATION_SUCCESS
} from "../../store/actionTypes";
import {Failure, Success} from "../../util/Toasts";
import {validateEmail} from "../../util/Regex";
import {registerEmployee} from "../../store/actions/employeeActions";

export function EmployeeRegistration() {

    const [validation,setValidation] = useState<IEmployeeValidation>({
        firstNameReq : false,
        lastNameReq : false,
        emailReq : false,
        emailFormatInvalid : false,
        contactNoReq : false,
        addressReq : false,
        genderReq : false,
        positionReq : false
    });

    const [employee, setEmployee] = useState<IEmployee>({
        firstName : "",
        lastName : "",
        address : "",
        email : "",
        contactNumber : "",
        gender : "None",
        birthday : new Date().toISOString().split('T')[0],
        createdDateTime : new Date(),
        position : "None"
    });

    const [passport,setPassport] = useState<File|null>();
    const [policeReport,setPoliceReport] = useState<File|null>();

    const dispatch = useDispatch();
    const { processing, type, error , message, progress } = useSelector((state: RootState) => state.employee);

    useEffect(() => {
        dispatch({
            type: USER_REGISTRATION_DEFAULT
        });
    },[])

    useEffect(() => {
        if(processing && type === USER_REGISTRATION_SUCCESS) {
            Success(message as string);
        } else if(processing && (type === PASSPORT_UPLOAD_SUCCESS ||
            type === POLICE_REPORT_UPLOAD_SUCCESS)) {
            Success(message as string)
        } else if(processing && (type === PASSPORT_UPLOAD_FAILED ||
            type === POLICE_REPORT_UPLOAD_FAILED)) {
            Failure(error as string)
        }
        else if(!processing && (type === USER_ALREADY_EXISTS || type === USER_REGISTRATION_FAILED)) {
            Failure(error as string)
            dispatch({
                type: USER_REGISTRATION_DEFAULT
            });
        } else if(!processing && type === USER_REGISTRATION_COMPLETED) {
            dispatch({
                type: USER_REGISTRATION_DEFAULT
            });
        }
    },[processing,type, error, message, progress, dispatch])

    function onSubmit() {

        setValidation(prevState => ({
            ...prevState,
            firstNameReq : !employee.firstName,
            lastNameReq : !employee.lastName,
            addressReq : !employee.address,
            emailReq : !employee.email,
            emailFormatInvalid : !validateEmail(employee.email),
            contactNoReq : !employee.contactNumber,
            genderReq : employee.gender === "None",
            positionReq : employee.position === "None"
        }))

        // validation
        if(employee.firstName && employee.lastName && employee.address && employee.contactNumber && employee.gender !== "None"
            && employee.email && validateEmail(employee.email) && employee.position !== "None") {
            dispatch({
                type: USER_REGISTRATION_PROGRESS,
                progress : 0
            });
            // create user account
            dispatch(registerEmployee(employee, passport, policeReport, "EMPLOYEE", () => {}));
        }
    }

    function onClear() {
        setEmployee(prevState => ({
            ...prevState,
            firstName : "",
            lastName : "",
            address : "",
            email : "",
            contactNumber : "",
            gender : "None",
            birthday : new Date().toISOString().split('T')[0],
            createdDateTime : new Date(),
            position : "None"
        }))

        setValidation(prevState => ({
            ...prevState,
            firstNameReq : false,
            lastNameReq : false,
            emailReq : false,
            emailFormatInvalid : false,
            contactNoReq : false,
            addressReq : false,
            genderReq : false,
            positionReq : false
        }))

        setPassport(null)
        setPoliceReport(null)
    }

    return (
        <div className="pd-20 card-box mb-30">
            {
                processing &&
                <div className="progress custom-progress">
                    <div className={"progress-bar bg-dgreen progress-bar-striped progress-bar-animated custom-progress-bar-" + progress?.toString()}
                         role="progressbar" aria-valuemin={0} aria-valuemax={100}>
                    </div>
                </div>
            }
            <br/>
            <form className="needs-validation">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="">First Name <sup>*</sup></label>
                            <input className="form-control" type="text" placeholder="First Name" required
                                   onChange={(e) => {
                                       setEmployee(prevState => ({
                                           ...prevState,
                                           firstName : e.target.value
                                       }))
                                       setValidation(prevState => ({
                                           ...prevState,
                                           firstNameReq : !e.target.value
                                       }))
                                   }}
                            />
                            {
                                validation.firstNameReq &&
                                <small className="invalid-feedback">The first name is required.</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Last Name <sup>*</sup></label>
                            <input className="form-control " type="text" placeholder="Last Name" required
                                   onChange={(e)=> {
                                       setEmployee(prevState => ({
                                           ...prevState,
                                           lastName : e.target.value
                                       }))
                                       setValidation(prevState => ({
                                           ...prevState,
                                           lastNameReq : !e.target.value
                                       }))
                                   }}
                            />
                            {
                                validation.lastNameReq &&
                                <small className="invalid-feedback">The last name is required.</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Gender <sup>*</sup></label>
                            <select className="custom-select"
                                    onChange={(e)=> {
                                        setEmployee(prevState => ({
                                            ...prevState,
                                            gender : e.target.value
                                        }))
                                        setValidation(prevState => ({
                                            ...prevState,
                                            genderReq : !e.target.value || e.target.value === 'None'
                                        }))
                                    }}
                            >
                                <option defaultValue="None">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {
                                validation.genderReq &&
                                <small className="invalid-feedback">Please select employee's gender.</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Birthday <sup>*</sup></label>
                            <input className="form-control date-picker" type="date" data-date=""
                                   onChange={(e)=> {
                                       setEmployee(prevState => ({
                                           ...prevState,
                                           birthday : e.target.value
                                       }))
                                   }}
                                   data-date-format="DD MMMM YYYY" value={employee.birthday}/>
                        </div>
                        <div className="form-group">
                            <label>Email <sup>*</sup></label>
                            <input className="form-control " placeholder="employee@example.com" type="email" required
                                   onChange={(e)=> {
                                       setEmployee(prevState => ({
                                           ...prevState,
                                           email : e.target.value
                                       }))
                                       setValidation(prevState => ({
                                           ...prevState,
                                           emailReq : !e.target.value,
                                           emailFormatValid : validateEmail(e.target.value || "")
                                       }))
                                   }}
                            />
                            {
                                (validation.emailReq || validation.emailFormatInvalid) &&
                                <small className="invalid-feedback">{validation.emailReq ? "The email is required."
                                    : validation.emailFormatInvalid ? "Invalid email." : ""}</small>
                            }
                        </div>
                        <div className="form-group">
                            <label>Contact number <sup>*</sup></label>
                            <input className="form-control " placeholder="+61xxxxxxxxx" type="text" required
                                   onChange={(e)=> {
                                       setEmployee(prevState => ({
                                           ...prevState,
                                           contactNumber : e.target.value
                                       }))
                                       setValidation(prevState => ({
                                           ...prevState,
                                           contactNoReq : !e.target.value,
                                       }))
                                   }}
                            />
                            {
                                validation.contactNoReq &&
                                <small className="invalid-feedback">The contact number is required</small>
                            }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Address <sup>*</sup></label>
                            <textarea className="form-control " required
                                      onChange={(e)=> {
                                          setEmployee(prevState => ({
                                              ...prevState,
                                              address : e.target.value
                                          }))
                                          setValidation(prevState => ({
                                              ...prevState,
                                              addressReq : !e.target.value,
                                          }))
                                      }}
                            ></textarea>
                            {
                                validation.addressReq &&
                                <small className="invalid-feedback">The address is required.</small>
                            }
                        </div>

                        <div className="form-group">
                            <label>Position <sup>*</sup></label>
                            <select className="custom-select" required
                                    onChange={(e)=> {
                                        setEmployee(prevState => ({
                                            ...prevState,
                                            position : e.target.value
                                        }))
                                        setValidation(prevState => ({
                                            ...prevState,
                                            positionReq : !e.target.value || e.target.value === 'None'
                                        }))
                                    }}
                            >
                                <option defaultValue="None">Select Position</option>
                                <option value="Business Developer">Business Developer</option>
                                <option value="Area Supervisor">Area Supervisor</option>
                            </select>
                            {
                                validation.positionReq &&
                                <small className="invalid-feedback">Please select employee's position.</small>
                            }
                        </div>

                        <div className="form-group">
                            <label>Other Details</label>
                            <textarea className="form-control"
                                      onChange={(e)=> {
                                          setEmployee(prevState => ({
                                              ...prevState,
                                              otherDetails : e.target.value
                                          }))
                                      }}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="form-group col-8">
                                    <label>Passport Copy</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input"
                                               onChange={(e) => {
                                                   setPassport(e.target.files?.item(0))
                                               }}
                                        />
                                        <label className="custom-file-label">{!passport ? "Choose file" : passport.name}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-8">
                                    <label>Police Report</label>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input"
                                               onChange={(e) => {
                                                   setPoliceReport(e.target.files?.item(0))
                                               }}
                                        />
                                        <label className="custom-file-label">{!policeReport ? "Choose file" : policeReport.name}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="reset" className="btn btn-danger mr-3"
                                onClick={ () => onClear() }
                            >Clear</button>
                            <button  className="btn btn-primary" disabled={processing}
                                     onClick={() => {
                                         onSubmit()
                                     }}
                            >Register</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
