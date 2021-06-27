import React, {useEffect, useState} from "react";

export function TOAST_SUCCESS ({message} : {message : string}) {

    const[isTimeOut,setIsTimeOut] = useState(false);

    useEffect(()=> {
        setTimeout(
            function () {
                setIsTimeOut(true)
            },
            3000
        );
    },[]);

    return (
        <div className={`toast ${!isTimeOut ? "show" : ""}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-dgreen">

                <strong className="mr-auto text-light ">Success</strong>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
                        onClick={() => setIsTimeOut(true)}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body text-light bg-dgreen">
                {message}
            </div>
        </div>
    )
}

export function TOAST_ERROR ({message} : {message : string}) {

    const[isTimeOut,setIsTimeOut] = useState(false);

    useEffect(()=> {
        setTimeout(
            function () {
                setIsTimeOut(true)
            },
            3000
        );
    },[]);

    return (
        <div className={`toast ${!isTimeOut ? "show" : ""}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-bred">

                <strong className="mr-auto text-light ">Error</strong>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
                onClick={() => setIsTimeOut(true)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body text-light bg-bred">
                {message}
            </div>
        </div>
    )
}
