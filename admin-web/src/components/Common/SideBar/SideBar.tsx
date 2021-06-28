import React from "react";
import logo from "../../../resources/images/logo_dark.svg";

export function SideBar() {

    return (
        <div className="left-side-bar">
            <div className="brand-logo">
                <a href="/">
                    <img className="img-fluid" src={logo} alt="logo"/>
                </a>
                <div className="close-sidebar" data-toggle="left-sidebar-close">
                    <i className="icon ion-ios-close close-icon"></i>
                </div>
            </div>

            <div className="menu-block customscroll">
                <div className="sidebar-menu">
                    <ul id="accordion-menu">
                        <li>
                            <a href="#dashboard" className="dropdown-toggle no-arrow">
                                <i className="icon ion-ios-home custom-icons"></i>
                                <span className="/dashboard">Home</span>
                            </a>
                        </li>

                        <li className="dropdown">
                            <a href="#collapseJobs" className="dropdown-toggle btn" data-toggle="collapse">
                                <i className="icon ion-ios-briefcase custom-icons"></i>
                                <span className="accordion-menu">Jobs</span>
                            </a>
                            <div className="collapse" id="collapseJobs">
                                <ul>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href="#jobs">- Jobs</a></li>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href="#jobs/schedule-new-job">- Job Scheduling</a>
                                    </li>
                                    <li className="li-submenu">
                                        <a className="li-submenu-color" href="#jobs/job-history">- Job History</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="dropdown">
                            <a href="#collapseEmployees" className="dropdown-toggle btn" data-toggle="collapse">
                                <i className="icon ion-ios-contacts custom-icons"></i>
                                <span className="accordion-menu">Employees</span>
                            </a>
                            <div className="collapse" id="collapseEmployees">
                                <ul>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href="#employee">- Employees</a></li>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href="#employee/registration">- Employee Registration</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="dropdown">
                            <a href="#collapseAdmins" className="dropdown-toggle btn" data-toggle="collapse">
                                <i className="icon ion-ios-contact custom-icons"></i>
                                <span className="accordion-menu">Administration Area</span>
                            </a>
                            <div className="collapse" id="collapseAdmins">
                                <ul>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href="#admin">- Administrators</a></li>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href="#admin/registration">- Admin Registration</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href="#payment" className="dropdown-toggle no-arrow">
                                <i className="icon ion-ios-cash custom-icons"></i>
                                <span className="">Payments</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
