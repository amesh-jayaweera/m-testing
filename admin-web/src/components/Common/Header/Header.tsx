import React from "react";
import profilePhoto from "../../../resources/images/profile-placeholder.svg";
import {Notifications} from "../Notifications/Notifications";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../../store/actions/authActions";
import {RootState} from "../../../store/reducers/rootReducer";
import {menuOpen} from "../../../store/actions/otherActions";

export function Header() {

    const dispatch = useDispatch();
    const { user: {firstName, lastName} } = useSelector((state: RootState) => state.auth);
    function onMenuClick() {
        dispatch(menuOpen(true))
    }

    const logoutClickHandler = () => {
        dispatch(signOut());
    };

    return (
        <div className="header">
            <div className="header-left" onClick={() => onMenuClick()}>
                <div className={`menu-icon icon ion-ios-menu`} id="top-menu-icon" onClick={() => onMenuClick()}/>
            </div>
            <div className="header-right">

                <Notifications/>

                <div className="user-info-dropdown mr-3">
                    <div className="dropdown">
                        <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown">
                        <span className="user-icon">
                            <img src={profilePhoto} alt="User Profile Identity"/>
                        </span>
                            <span className="user-name">{`${firstName} ${lastName}`}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                            <a className="dropdown-item" href="#admin/profile"><i className="icon ion-md-contact"/>Profile</a>
                            <a className="dropdown-item" href="/#" onClick={logoutClickHandler}><i className="icon ion-md-undo "/>Log Out</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
