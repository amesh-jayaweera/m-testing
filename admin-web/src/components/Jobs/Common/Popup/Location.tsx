import React, {useState} from "react";
import {useHistory} from "react-router";

export function Location () {

    const history = useHistory();
    const [open,setOpen] = useState<boolean>(true);

    return (
        <div className={open ? "modal fade show d-block animated slideInDown" : "modal fade show d-block animated fadeOutUp"} id="exampleModal2" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Adding Locations</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => {setOpen(false)
                                history.goBack()}}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" noValidate>
                            <div className="form-group form-dialog">
                                <label htmlFor="recipient-name" className="col-form-label">1<sup
                                    className="text-dark">st</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="text" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required/>
                                        <input type="text" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required/>
                                </div>
                            </div>

                            <div className="form-group form-dialog">
                                <label htmlFor="recipient-name" className="col-form-label">2<sup
                                    className="text-dark">nd</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="text" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required/>
                                        <input type="text" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required/>
                                </div>
                            </div>

                            <div className="form-group form-dialog">
                                <label htmlFor="recipient-name" className="col-form-label">3<sup
                                    className="text-dark">rd</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="text" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required/>
                                        <input type="text" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required/>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">4<sup
                                    className="text-dark">th</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="text" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required/>
                                        <input type="text" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required/>
                                </div>
                            </div>
                            <div className="float-right">
                                {/*<button type="button" className="btn btn-secondary"> Clear</button>*/}
                                <button type="submit" className="btn btn-primary">Locate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
