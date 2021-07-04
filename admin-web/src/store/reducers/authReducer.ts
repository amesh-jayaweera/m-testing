import {AuthAction, AuthState} from '../../type';
import {SET_ERROR, SET_LOADING, SET_SUCCESS, SET_SUSPEND, SET_USER, SIGN_OUT} from '../actionTypes';

const initialState: AuthState = {
    user : {
        firstName : "",
        lastName : "",
        gender : "",
        birthday : "",
        email : "",
        contactNumber : "",
        address : "",
        suspend : false
    },
    authenticated: false,
    loading: true,
    error: '',
    success: ''
};

export const authReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case SET_SUSPEND:
            return {
                ...state,
                authenticated: false,
                error : action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SIGN_OUT:
            return {
                ...state,
                user:  {
                    firstName : "",
                    lastName : "",
                    gender : "",
                    birthday : "",
                    email : "",
                    contactNumber : "",
                    address : ""
                },
                authenticated: false,
                loading: false
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        default:
            return state;
    }
};
