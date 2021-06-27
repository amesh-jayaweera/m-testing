import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers/rootReducer";
import firebase from "firebase";
import {TableActions} from "../../type";
import {AdminListTable, EmployeeListTable} from "../table";
import {ADMIN_TABLE_DATA, EMPLOYEE_TABLE_DATA} from "../actionTypes";

export const getAdmins = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();

    return async dispatch => {

        let admins : AdminListTable[] = [];

        db.collection("admins").get().then((querySnapshot) => {
            let count = 0;
            querySnapshot.forEach((doc) => {
                let admin : AdminListTable  = doc.data() as AdminListTable;
                count += 1;
                admin.id = count;
                admins.push(admin);
            });

            dispatch({
                type : ADMIN_TABLE_DATA,
                data : admins
            })
        });
    }
}

export const getEmployees = () : ThunkAction<void, RootState, null, TableActions> => {

    const db = firebase.firestore();

    return async dispatch => {

        let employees : EmployeeListTable[] = [];

        db.collection("employees").get().then((querySnapshot) => {
            let count = 0;
            querySnapshot.forEach((doc) => {
                let employee : EmployeeListTable  = doc.data() as EmployeeListTable;
                count += 1;
                employee.id = count;
                employees.push(employee);
            });

            dispatch({
                type : EMPLOYEE_TABLE_DATA,
                data : employees
            })
        });
    }
}
