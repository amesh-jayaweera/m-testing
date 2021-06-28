import React, {useState} from "react";
import {useHistory} from "react-router";

export function AddDays() {

    const history = useHistory();
    const [open,setOpen] = useState<boolean>(true);

    return (
        <div className={open ? "modal fade show d-block animated slideInDown" : "modal fade show d-block animated fadeOutUp"} id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Customized Days</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => {setOpen(false)
                                history.goBack()}}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option1"/>
                                <label className="form-check-label">
                                    Sunday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option2"/>
                                <label className="form-check-label">
                                    Monday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option3"/>
                                <label className="form-check-label">
                                    Tuesday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option4"/>
                                <label className="form-check-label">
                                    Wednesday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option5"/>
                                <label className="form-check-label">
                                    Thursday
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option6"/>
                                <label className="form-check-label">
                                    Friday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="option7"/>
                                <label className="form-check-label">
                                    Saturday
                                </label>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
