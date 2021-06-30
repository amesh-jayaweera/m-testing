import profilePhotoNotification from "../../../resources/images/img.jpg";
import React from "react";

export function Notifications() {
    return (
        <div className="user-notification">
            <div className="dropdown">
                <a className="dropdown-toggle no-arrow" href="/#" role="button" data-toggle="dropdown">
                    <i className="icon ion-ios-notifications notification-icon"/>
                    <span className="badge notification-active"/>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <div className="notification-list mx-h-350 customscroll">
                        <ul>
                            <li>
                                <a href="/#">
                                    <img src={profilePhotoNotification} alt=""/>
                                    <h3>John Doe</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed...</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
