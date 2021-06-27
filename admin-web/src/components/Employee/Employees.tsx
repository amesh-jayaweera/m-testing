import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees} from "../../store/actions/tablesActions";
import {RootState} from "../../store/reducers/rootReducer";
import DataTable from "react-data-table-component";

const columns = [
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'First Name',
        selector: 'firstName',
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: 'lastName',
        sortable: true,
    },
    {
        name: 'Gender',
        selector: 'gender',
        sortable: true,
    },
    {
        name: 'Birthday',
        selector: 'birthday',
        sortable: true,
    },
    {
        name: 'Address',
        selector: 'address',
        sortable: true,
    },
    {
        name: 'Position',
        selector: 'contactNumber',
        sortable: true,
    },
    {
        name: 'Contact Number',
        selector: 'contactNumber',
        sortable: true,
    },
];

export function Employees() {
    const dispatch = useDispatch();
    dispatch(getEmployees());
    const { data } = useSelector((state: RootState) => state.employeeTable);

    return (
        <div className="card-box mb-30 ">
            <DataTable
                title="Employees"
                columns={columns}
                data={data}
                pagination={true}
            />
        </div>
    )
}
