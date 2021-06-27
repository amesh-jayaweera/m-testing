import React, {Suspense, useEffect} from "react";
import {Header} from "../Common/Header/Header";
import {SideBar} from "../Common/SideBar/SideBar";
import {ContainerNavigation} from "../Common/ContainerNavigation/ContainerNavigation";
import {AdminRegistration} from "../Admin/AdminRegistration";
import {Dashboard} from "../Dashboard/Dashboard";
import {useLocation} from "react-router";
import {EmployeeRegistration} from "../Employee/EmployeeRegistration";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {setSuccess} from "../../store/actions/authActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Admins} from "../Admin/Admins";
import {Employees} from "../Employee/Employees";

export function HomePage() {

    const location = useLocation();

    const { user, success } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);

    return (
      <>
          <Header/>
          <SideBar/>

          <div className="mobile-menu-overlay"></div>
          <div className="main-container">
              {
                  (location.hash === '#dashboard' || location.hash === '#' || location.hash === '') && <Dashboard/>
              }
              {
                  location.hash === '#admin-registration' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Admin Registration"} mainTitle={"Administrators"} mainNav={"admin"} />
                      <AdminRegistration/>
                  </div>
              }
              {
                  location.hash === '#employee-registration' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Employee Registration"} mainTitle={"Employees"} mainNav={"employee"} />
                      <EmployeeRegistration/>
                  </div>
              }
              {
                  location.hash === '#admin-list' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Admins"} mainTitle={"Admins"} mainNav={"admin"} />
                      <Admins/>
                  </div>
              }
              {
                  location.hash === '#employee-list' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Employees"} mainTitle={"Employees"} mainNav={"employee"} />
                      <Employees/>
                  </div>
              }
          </div>
          <ToastContainer/>
      </>
    );
}
