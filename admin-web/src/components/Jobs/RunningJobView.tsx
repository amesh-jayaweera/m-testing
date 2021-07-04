import React from "react";
import imagePlaceHolder from '../../resources/images/u-placeholder.svg';

export function RunningJobView() {

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
                                        <div className="wrapping"></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Shift</label>
                                        <div className="wrapping"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <div className="wrapping"></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Address</label>
                                        <div className="wrapping"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters w-100">
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label htmlFor="">Employee Id </label>
                                        <div className="wrapping"></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Shift On Time </label>
                                        <div className="wrapping"></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Location In Time </label>
                                        <div className="wrapping"></div>
                                    </div>
                                </div>
                                <div className="col-lg-6 px-2">
                                    <div className="form-group">
                                        <label>Employee Name </label>
                                        <div className="wrapping"></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Shift Off Time </label>
                                        <div className="wrapping"></div>
                                    </div>
                                    <div className="form-group">
                                        <label>Location Out Time </label>
                                        <div className="wrapping"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="row w-100 no-gutters">
                                <div className="d-flex p-1 flex-wrap">
                                    <img className="img-fluid eve-images shadow-sm m-1" width="150px" height="150px"
                                         src={imagePlaceHolder} alt="eve-images"/>
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
                                <tr>
                                    <td>7:35:49 PM</td>
                                    <td>1.08452</td>
                                    <td>80.01454</td>
                                    <td>
                                        <div className="badge text-dark badge-dgreen ">In Location</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>7:35:49 PM</td>
                                    <td>1.08452</td>
                                    <td>80.01454</td>
                                    <td>
                                        <div className="badge text-dark badge-dred ">Location Out</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>7:35:49 PM</td>
                                    <td>1.08452</td>
                                    <td>80.01454</td>
                                    <td>
                                        <div className="badge text-light badge-secondary ">Unable to track</div>
                                    </td>
                                </tr>


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
                            <div className="">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d440.5316425800358!2d80.35407879313111!3d7.482881420627846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjgnNTguNCJOIDgwwrAyMScxNS4zIkU!5e0!3m2!1sen!2slk!4v1623264982066!5m2!1sen!2slk"
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
