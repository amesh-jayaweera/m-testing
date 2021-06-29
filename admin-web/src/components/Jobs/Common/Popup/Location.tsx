import React, {useState} from "react";
import {useHistory} from "react-router";
import {ILocation} from "../../../../type";
import {ValidateLatitude, ValidateLongitude} from "../../../../util/Validation";

export function Location ({onLocationChange , initLocation} : {onLocationChange : any , initLocation : ILocation}) {

    const history = useHistory();
    const [open,setOpen] = useState<boolean>(true);
    const [location, setLocation] = useState<ILocation>(initLocation);

    function onSubmit() {
        if(ValidateLatitude(location.lat1) && ValidateLatitude(location.lat2) && ValidateLatitude(location.lat3) && ValidateLatitude(location.lat4)
        && ValidateLongitude(location.lon1) && ValidateLongitude(location.lon2) && ValidateLongitude(location.lon3) && ValidateLongitude(location.lon4)) {
            onLocationChange(location)
            setOpen(false)
            history.goBack()
        }
    }

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
                                    <input type="number" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required
                                           onChange={(e)=> {
                                               setLocation(prevState => ({
                                                   ...prevState,
                                                   lat1 : Number(e.target.value)
                                               }))
                                           }}
                                           value={location.lat1}
                                    />
                                    {
                                        !ValidateLatitude(location.lat1) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                        <input type="number" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required
                                               onChange={(e)=> {
                                                   setLocation(prevState => ({
                                                       ...prevState,
                                                       lon1 : Number(e.target.value)
                                                   }))
                                               }}
                                               value={location.lon1}
                                        />
                                    {
                                        !ValidateLongitude(location.lon1) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                </div>
                            </div>

                            <div className="form-group form-dialog">
                                <label htmlFor="recipient-name" className="col-form-label">2<sup
                                    className="text-dark">nd</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="number" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required
                                           onChange={(e)=> {
                                               setLocation(prevState => ({
                                                   ...prevState,
                                                   lat2 : Number(e.target.value)
                                               }))
                                           }}
                                           value={location.lat2}
                                    />
                                    {
                                        !ValidateLatitude(location.lat2) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                        <input type="number" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required
                                               onChange={(e)=> {
                                                   setLocation(prevState => ({
                                                       ...prevState,
                                                       lon2 : Number(e.target.value)
                                                   }))
                                               }}
                                               value={location.lon2}
                                        />
                                    {
                                        !ValidateLongitude(location.lon2) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                </div>
                            </div>

                            <div className="form-group form-dialog">
                                <label htmlFor="recipient-name" className="col-form-label">3<sup
                                    className="text-dark">rd</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="number" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required
                                           onChange={(e)=> {
                                               setLocation(prevState => ({
                                                   ...prevState,
                                                   lat3 : Number(e.target.value)
                                               }))
                                           }}
                                           value={location.lat3}
                                    />
                                    {
                                        !ValidateLatitude(location.lat3) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                        <input type="number" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required
                                               onChange={(e)=> {
                                                   setLocation(prevState => ({
                                                       ...prevState,
                                                       lon3 : Number(e.target.value)
                                                   }))
                                               }}
                                               value={location.lon3}
                                        />
                                    {
                                        !ValidateLongitude(location.lon3) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="recipient-name" className="col-form-label">4<sup
                                    className="text-dark">th</sup> Point<sup>*</sup></label>
                                <div className="d-flex">
                                    <input type="number" placeholder="Lat" className="form-control mr-1"
                                           id="recipient-name" required
                                           onChange={(e)=> {
                                               setLocation(prevState => ({
                                                   ...prevState,
                                                   lat4 : Number(e.target.value)
                                               }))
                                           }}
                                           value={location.lat4}
                                    />
                                    {
                                        !ValidateLatitude(location.lat4) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                        <input type="number" placeholder="Long" className="form-control ml-1"
                                               id="recipient-name" required
                                               onChange={(e)=> {
                                                   setLocation(prevState => ({
                                                       ...prevState,
                                                       lon4 : Number(e.target.value)
                                                   }))
                                               }}
                                               value={location.lon4}
                                        />
                                    {
                                        !ValidateLongitude(location.lon4) &&  <small className="invalid-feedback">Invalid</small>
                                    }
                                </div>
                            </div>
                            <div className="float-right">
                                <button type="button" className="btn btn-primary"
                                    onClick={() => onSubmit()}
                                >Locate</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}