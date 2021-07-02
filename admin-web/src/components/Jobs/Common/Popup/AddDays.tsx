import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {removeValFromArray} from "../../../../util/Helpers";

export function AddDays( {onDaysChange , initDays, isOpen} : {onDaysChange : any , initDays : string[], isOpen : boolean}) {

    const history = useHistory();
    const [valid, setValid] = useState<boolean>(true);
    const [days, setDays] = useState<string[]>(initDays);

    function onHandler(checked : boolean, day : string) {
        if(checked) {
            if(!days.includes(day)) {
                setDays([...days,day]);
            }
        } else {
            let temp = removeValFromArray(days, day);
            setDays(temp);
        }
    }

    useEffect(() => {
        setValid(days.length !== 0);
    },[days]);

    function onSubmit() {
        if(valid) {
            onDaysChange(days);
            history.goBack();
        }
    }

    return (
        <div className={`modal fade ${isOpen ? "show d-block" : ""}`} id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Customized Days</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                            onClick={() => {
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
