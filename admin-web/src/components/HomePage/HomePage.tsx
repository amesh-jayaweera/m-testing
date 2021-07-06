import React, {useEffect} from "react";
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
import {ScheduleJob} from "../Jobs/ScheduleJob";
import {Jobs} from "../Jobs/Jobs";
import {JobHistory} from "../Jobs/JobHistory";
import {Payments} from "../Payments/Payments";
import {EmployeeView, MY_PROFILE, PROFILE_ADMIN, PROFILE_EMPLOYEE} from "../Profile/EmployeeView";
import {NotFoundDashboard} from "../Error/NotFound/NotFoundDashboard";
import {locations, locationsStartWith} from "../constants";
import {JobView} from "../Jobs/JobView";
import {RunningJobView} from "../Jobs/RunningJobView";
import { Offline, Online } from 'react-detect-offline';

export function HomePage() {

    const location = useLocation();

    const { success } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(success) {
            dispatch(setSuccess(''));
        }
    }, [success, dispatch]);

    const startWith = () => {
        for(let i=0;i<locationsStartWith.length;i++){
            if(location.hash.startsWith(locationsStartWith[i])) return true;
        }
        return false;
    };

    return (
      <>
          <Header/>
          <SideBar/>
          <div className="mobile-menu-overlay"/>
          <div className="main-container">
              <Online>
              {
                  (location.hash === '#dashboard' || location.hash === '#' || location.hash === '') &&
                  <Dashboard/>
              }
              {
                  location.hash === '#admin/registration' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Admin Registration"} mainTitle={"Administrators"} mainNav={"admin"}/>
                      <AdminRegistration/>
                  </div>
              }
              {
                  location.hash === '#employee/registration' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Employee Registration"} mainTitle={"Employees"} mainNav={"employee"}/>
                      <EmployeeRegistration/>
                  </div>
              }
              {
                  location.hash === '#admin' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Admins"} mainTitle={"Admins"} mainNav={"admin"}/>
                      <Admins/>
                  </div>
              }
              {
                  location.hash === '#employee' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Employees"} mainTitle={"Employees"} mainNav={"employee"}/>
                      <Employees/>
                  </div>
              }
              {
                  location.hash === '#jobs' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Scheduled Jobs"} mainTitle={"Scheduled Jobs"} mainNav={"jobs"}/>
                      <Jobs/>
                  </div>
              }
              {
                  location.hash === '#jobs/history' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Job History"} mainTitle={"Job History"} mainNav={"jobs"}/>
                      <JobHistory/>
                  </div>
              }
              {
                  location.hash === '#payment' &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Payments"} mainTitle={"Payments"} mainNav={"payments"}/>
                      <Payments/>
                  </div>
              }
              {
                  (location.hash === '#jobs/schedule-job' || location.hash === '#jobs/schedule-job#add-location'
                      || location.hash === '#jobs/schedule-job#add-recurrence-days' || location.hash === '#jobs/schedule-job#map-view'
                  ) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Schedule Job"} mainTitle={"Jobs"} mainNav={"jobs"}/>
                      <ScheduleJob isEdit={false}/>
                  </div>
              }
              {
                  (location.hash.startsWith('#jobs/schedule-job/edit?id=')) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Update Job"} mainTitle={"Update Job"} mainNav={"jobs"}/>
                      <ScheduleJob isEdit={true}/>
                  </div>
              }
              {
                  (location.hash.startsWith('#admin/view?id=')) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Admins"} mainTitle={"Profile"} mainNav={"admin"}/>
                      <EmployeeView actionType={PROFILE_ADMIN} myProfile={false}/>
                  </div>
              }
              {
                  (location.hash === '#admin/profile') &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Profile"} mainTitle={"My Profile"} mainNav={""}/>
                      <EmployeeView actionType={MY_PROFILE} myProfile={true}/>
                  </div>
              }
              {
                  (location.hash.startsWith('#employee/view?id=')) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Employees"} mainTitle={"Profile"} mainNav={"employee"}/>
                      <EmployeeView actionType={PROFILE_EMPLOYEE} myProfile={false}/>
                  </div>
              }
              {
                  (location.hash.startsWith('#jobs/schedule-job/view?id=')) &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Job Profile"} mainTitle={"Scheduled Jobs"} mainNav={"jobs"}/>
                      <JobView/>
                  </div>
              }
              {
                      location.hash.startsWith('#jobs/running/job/view?id=') &&
                  <div className="pd-ltr-20 xs-pd-20-10">
                      <ContainerNavigation title={"Job Profile"} mainTitle={"Running Jobs"} mainNav={"jobs"}/>
                      <RunningJobView isHistory={false}/>
                  </div>
              }
                  {
                      location.hash.startsWith('#jobs/running/history/job/view?id=') &&
                      <div className="pd-ltr-20 xs-pd-20-10">
                          <ContainerNavigation title={"Job Profile"} mainTitle={"Running Jobs"} mainNav={"jobs"}/>
                          <RunningJobView isHistory={true}/>
                      </div>
                  }
              {
                  location.hash === '#dashbord/not-found' &&
                      <NotFoundDashboard/>
              }
              {
                  (!locations.includes(location.hash) && !startWith()) &&
                  <NotFoundDashboard/>
              }
              </Online>
              <Offline>
                  <h1>Something Went Wrong!, Please, check you internet connection.</h1>
              </Offline>
          </div>
          <ToastContainer/>
      </>
    );
}
