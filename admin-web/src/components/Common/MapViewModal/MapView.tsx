import React from "react";
import {useHistory} from "react-router";

export function MapView({lat, lon} : {lat : number, lon : number}) {

    const history = useHistory();
    const url = `https://maps.google.com/maps?q=${lat},${lon}&hl=es;z=14&amp&output=embed`;

    return (
        <div className="modal fade show d-block" id="map_view" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-body mb-0 p-0">
                        <iframe src={url}
                                width="100%" height="450" loading="lazy" className="iframe-map"
                                title={"Scheduled Job Location on Map"}
                        />
                    </div>
                    <div className="modal-footer justify-content-center flex-column flex-md-row">
                        <button type="button" className="btn btn-outline-primary btn-rounded btn-md ml-4"
                                data-dismiss="modal"
                                onClick={()=> history.goBack()}
                        >Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
