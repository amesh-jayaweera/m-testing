import React from "react";

export function ContainerNavigation({title,mainTitle,mainNav,suspendBtnEnabled} : {title : string, mainTitle : string, mainNav : string
    , suspendBtnEnabled : boolean}) {
    return (
        <div className="page-header">
            <div className="row">
                <div className="col-md-6 col-sm-12">
                    <div className="title">
                        <h4>{title}</h4>
                    </div>
                    <nav aria-label="breadcrumb" role="navigation">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href={"#dashboard"}>Home</a></li>
                            <li className="breadcrumb-item"><a href={`#${mainNav}`}>{mainTitle}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{title}</li>
                        </ol>
                    </nav>
                </div>
                {
                    suspendBtnEnabled &&
                    <div className="col-sm-6 d-flex justify-content-start justify-content-sm-end">
                        <button className="btn btn-danger mt-3 mt-sm-0">Suspend</button>
                    </div>
                }
            </div>
        </div>
    )
}