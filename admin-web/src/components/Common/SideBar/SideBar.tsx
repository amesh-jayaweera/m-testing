import React from "react";
import logo from "../../../resources/images/logo_dark.svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/reducers/rootReducer";
import {MENU_OPEN} from "../../../store/actionTypes";
import {menuOpen} from "../../../store/actions/otherActions";

export function SideBar() {

    const dispatch = useDispatch();
    const { type } = useSelector((state: RootState) => state.menu);

    function onClose() {
        dispatch(menuOpen(false));
    }

    return (
        <div className={`left-side-bar ${type === MENU_OPEN ? "h-menu-open" : ""}`} id="side_bar">
            <div className="brand-logo">
                <a href="/">
                    <img className="img-fluid" src={logo} alt="logo"/>
                </a>
                <div className="close-sidebar" data-toggle="left-sidebar-close" id="menu-close"
                    onClick={() => {onClose()}}
                >
                    <i className="icon ion-ios-close close-icon"/>
                </div>
            </div>

            <div className="menu-block customscroll">
                <div className="sidebar-menu">
                    <ul id="accordion-menu">
                        <li>
                            <a href={"#dashboard"} className="dropdown-toggle no-arrow">
                                <i className="icon ion-ios-home custom-icons"/>
                                <span className="dashboard">Home</span>
                            </a>
                        </li>

                        <li className="dropdown">
                            <a href={"#collapseJobs"} className="dropdown-toggle btn" data-toggle="collapse">
                                <i className="icon ion-ios-briefcase custom-icons"/>
                                <span className="accordion-menu">Jobs</span>
                            </a>
                            <div className="collapse" id="collapseJobs">
                                <ul>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href={"#jobs"}>- Jobs</a></li>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href={"#jobs/schedule-job"}>- Job Scheduling</a>
                                    </li>
                                    <li className="li-submenu">
                                        <a className="li-submenu-color" href={"#jobs/history"}>- Job History</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="dropdown">
                            <a href={"#collapseEmployees"} className="dropdown-toggle btn" data-toggle="collapse">
                                <i className="icon ion-ios-contacts custom-icons"/>
                                <span className="accordion-menu">Employees</span>
                            </a>
                            <div className="collapse" id="collapseEmployees">
                                <ul>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href={"#employee"}>- Employees</a></li>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href={"#employee/registration"}>- Employee Registration</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="dropdown">
                            <a href={"#collapseAdmins"} className="dropdown-toggle btn" data-toggle="collapse">
                                <i className="icon ion-ios-contact custom-icons"/>
                                <span className="accordion-menu">Administration Area</span>
                            </a>
                            <div className="collapse" id="collapseAdmins">
                                <ul>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href={"#admin"}>- Administrators</a></li>
                                    <li className="li-submenu"><a
                                        className="li-submenu-color" href={"#admin/registration"}>- Admin Registration</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <a href={"#payment"} className="dropdown-toggle no-arrow">
                                <i className="icon ion-ios-cash custom-icons"/>
                                <span className="">Payments</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
