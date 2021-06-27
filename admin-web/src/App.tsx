import React, {Suspense, useEffect} from 'react';
import './App.css';
import {HomePage} from "./components/HomePage/HomePage";
import {createBrowserHistory} from "history";
import {Switch, Route, Router} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/reducers/rootReducer";
import {getUserById, setLoading} from "./store/actions/authActions";
import firebase from "firebase";
import {Loader} from "./components/Common/Loader/Loader";
import PublicRoute from "./components/Auth/PublicRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";

const history = createBrowserHistory();

function App() {

    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    // Check if user exists
    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setLoading(true));
                await dispatch(getUserById(user.uid));
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
                  <PublicRoute path="/" component={HomePage} exact />
                  {/*<PublicRoute path="/login" component={Login} exact />*/}
              </Switch>
          </Router>
    );
}

export default App;
