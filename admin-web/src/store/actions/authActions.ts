import { ThunkAction } from 'redux-thunk';
import {AuthAction, SignInData, LoggedUser} from '../../type';
import {SET_USER, SET_LOADING, SIGN_OUT, SET_ERROR, SET_SUCCESS, SET_SUSPEND} from '../actionTypes';
import {fire} from "../../index";
import {RootState} from "../reducers/rootReducer";

// Get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            const user = await fire.firestore().collection('admins').doc(id).get();
            if(user.exists) {
                const userData = user.data() as LoggedUser;
                if(!userData.suspend) {
                    dispatch({
                        type: SET_USER,
                        payload: userData
                    });
                } else {
                    dispatch({
                        type: SET_SUSPEND,
                        payload : 'Sorry, you account has been suspended.' +
                            '\nPlease contact the administrator for more details'
                    });
                }
            }
        } catch (err : any) {
            dispatch(setError(err.message));
        }
    }
};

// Set loading
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        });
    }
};

// Log In
export const signIn = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            await fire.auth().signInWithEmailAndPassword(data.email, data.password);
            return getUserById(data.email);
        } catch (err : any) {
            onError();
            dispatch(setError(err.message));
        }
    }
};

// Log out
export const signOut = (): ThunkAction<void, RootState, null, AuthAction> => {
    // return async dispatch => {
    //     try {
    //         dispatch(setLoading(true));
    //         // fire.firestore().clearPersistence()
    //         await fire.auth().signOut();
    //         dispatch({
    //             type: SIGN_OUT
    //         });
    //     } catch (err : any) {
    //         dispatch(setLoading(false));
    //     }
    // }

    return (dispatch) => {
        return new Promise(() => {
            dispatch(setLoading(true));
            fire
                .auth()
                .signOut()
                .then(() => {
                    dispatch({
                        type: SIGN_OUT
                    });
                })
                .catch(() => {dispatch(setLoading(false));});
        });
    };
};

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
};

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }
};
