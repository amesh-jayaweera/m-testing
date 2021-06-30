import React, {useState} from "react";
import {useHistory} from "react-router";
import {removeValFromArray} from "../../../../util/Helpers";

export function AddDays( {onDaysChange , initDays} : {onDaysChange : any , initDays : string[]}) {

    const history = useHistory();
    const [open,setOpen] = useState<boolean>(true);
    const [valid, setValid] = useState<boolean>(true);
    let days : string[] = initDays;

    function onHandler(checked : boolean, day : string) {
        if(checked) {
            if(!days.includes(day))
                days.push(day)
        } else {
            days = removeValFromArray(days, day)
        }

        setValid(days.length !== 0);
    }

    function onSubmit() {
        if(valid) {
            onDaysChange(days);
            setOpen(false);
            history.goBack();
        }
    }

    return (
        <div className={open ? "modal fade show d-block animated slideInDown" : "modal fade show d-block animated fadeOutUp"} id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Customized Days</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => {
                                setOpen(false);
                                history.goBack();
                            }}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            !valid && <small className="invalid-feedback">Select at least one.</small>
                        }
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Sun"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                    checked={days.includes("Sun")}
                            />
                                <label className="form-check-label">
                                    Sunday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Mon"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                   checked={days.includes("Mon")}
                            />
                                <label className="form-check-label">
                                    Monday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Tue"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                   checked={days.includes("Tue")}
                            />
                                <label className="form-check-label">
                                    Tuesday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Wed"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                   checked={days.includes("Wed")}
                            />
                                <label className="form-check-label">
                                    Wednesday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Thu"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                   checked={days.includes("Thu")}
                            />
                                <label className="form-check-label">
                                    Thursday
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Fri"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                   checked={days.includes("Fri")}
                            />
                                <label className="form-check-label">
                                    Friday
                                </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Sat"
                                   onChange={(e) =>{onHandler(e.target.checked,e.target.value)}}
                                   checked={days.includes("Sat")}
                            />
                                <label className="form-check-label">
                                    Saturday
                                </label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" data-dismiss="modal" className="btn btn-primary"
                            onClick={() => onSubmit()}
                        >Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}