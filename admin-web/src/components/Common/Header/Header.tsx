import React, {useState} from "react";
import profilePhoto from "../../../resources/images/photo1.jpg";
import {Notifications} from "../Notifications/Notifications";
import {useDispatch} from "react-redux";
import {signOut} from "../../../store/actions/authActions";

export function Header() {

    const dispatch = useDispatch();
    // const { authenticated } = useSelector((state: RootState) => state.auth);
    const [toggle,setToggle] = useState(false);

    const logoutClickHandler = () => {
        dispatch(signOut());
    }

    return (
        <div className="header">
            <div className="header-left">
                <div className="menu-icon icon ion-ios-menu" onClick={() => {setToggle(!toggle)}}></div>
            </div>
            <div className="header-right">

                <Notifications/>

                <div className="user-info-dropdown mr-3">
                    <div className="dropdown">
                        <a className="dropdown-toggle" href="/#" role="button" data-toggle="dropdown">
                        <span className="user-icon">
                            <img src={profilePhoto} alt="User Profile Identity"/>
                        </span>
                            <span className="user-name">Ross C. Lopez</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                            <a className="dropdown-item" href="/#"><i className="icon ion-md-contact"></i> Profile</a>
                            <a className="dropdown-item" href="/#" onClick={logoutClickHandler}><i className="icon ion-md-undo "></i> Log Out</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
