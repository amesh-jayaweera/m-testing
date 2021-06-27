import { ThunkAction } from 'redux-thunk';
import {AuthAction, SignInData, LoggedUser, IEmployee} from '../../type';
import {SET_USER, SET_LOADING, SIGN_OUT, SET_ERROR, SET_SUCCESS} from '../actionTypes';
import firebase from "firebase";
import {RootState} from "../reducers/rootReducer";

// Get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await firebase.firestore().collection('admins').doc(id).get();
            if(user.exists) {
                const userData = user.data() as IEmployee;
                dispatch({
                    type: SET_USER,
                    payload: userData
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

// Set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        });
    }
}

// Log In
export const signIn = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            dispatch({
                type: SET_USER,
                payload: data.email
            });
            // console.log(user);
        } catch (err) {
            console.log('Error',err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

// Log out
export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: SIGN_OUT
            });
        } catch (err) {
            console.log(err);
            dispatch(setLoading(false));
        }
    }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }
}
