import React, {useEffect, useState} from 'react';
import './App.css';
import {HomePage} from "./components/HomePage/HomePage";
import {createBrowserHistory} from "history";
import {Switch, Router} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/reducers/rootReducer";
import {getUserById, setLoading} from "./store/actions/authActions";
import {fire} from "./index";
import {Loader} from "./components/Common/Loader/Loader";
import PublicRoute from "./components/Auth/PublicRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import {NotFound} from "./components/Error/NotFound/NotFound";
import {ForgotPassword} from "./components/ForgotPassword/ForgotPassword";
import {NotAvailable} from "./components/Error/NotAvailable/NotAvailable";
import appLogo57x57 from "./resources/images/app-logo-57x57.png";
import appLogo512x512 from "./resources/images/app-logo-512x512.png";

const history = createBrowserHistory();

function AppIcon57x57() {
    return (
        <img src={appLogo57x57} alt={"MultiFlex Employee App"} className="center"/>
    )
}

function AppIcon512x512() {
    return (
        <img src={appLogo512x512} alt={"MultiFlex Employee App"} className="center"/>
    )
}

function DownloadMultiFlexEmployeeApp() {

    const [message, setMessage] = useState<string>("");

    const checkUserAccess = async (username : string) => {
        const user = await fire.firestore().collection('employees').doc(username).get();
        const userExists : boolean = user.exists;
        return userExists;
    };

    useEffect(()=> {
        const username = window.prompt("Employee Email");
        if(username !== null) {
            checkUserAccess(username)
                .then((userExists) => {
                    if(userExists) {
                        setMessage("Authentication Success!");
                    } else {
                        setMessage("Authentication Failed!");
                    }
                })
                .catch(() => {
                    setMessage("Authentication Failed!");
                });
        } else {
            setMessage("Username and password required!")
        }
        return () => {
            //
        }
    },[]);

    return (
        <>
            <p>{message}</p>
            {
                message === "Authentication Success!" &&
                <a href="itms-services://?action=download-manifest&url=https://firebasestorage.googleapis.com/v0/b/multi-flex-198ad.appspot.com/o/employee-app%2Fmanifest.plist?alt=media&token=6645e2a3-d164-49cf-93ca-b3fede90d449">
                    Download & Install MultiFlex Employee App</a>
            }
        </>
    )
}

function App() {

    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    // Check if user exists
    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = fire.auth().onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setLoading(true));
                await dispatch(getUserById(user.email as string));
            }
            dispatch(setLoading(false));
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    if(loading) {
        return <Loader/>;
    }

    return (
          <Router history={history}>
              <Switch>
                  <PublicRoute path="/multiflex-employee-app-download" component={DownloadMultiFlexEmployeeApp} exact />
                  <PublicRoute path="/app-logo-57x57.png" component={AppIcon57x57} exact />
                  <PublicRoute path="/app-logo-512x512.png" component={AppIcon512x512} exact />
                  <PrivateRoute path="/" component={HomePage} exact/>
                  <PublicRoute path="/login" component={Login} exact />
                  <PrivateRoute path="/loading" component={Login} exact />
                  <PublicRoute path="/forgot-password" component={ForgotPassword} exact/>
                  <PrivateRoute path="/not-available" component={NotAvailable} exact/>
                  <PublicRoute path="*" component={NotFound} exact/>
              </Switch>
          </Router>
    );
}

export default App;
