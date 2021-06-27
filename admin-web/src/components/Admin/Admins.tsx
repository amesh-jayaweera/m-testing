import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getAdmins} from "../../store/actions/tablesActions";
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
        name: 'Contact Number',
        selector: 'contactNumber',
        sortable: true,
    },
];

export function Admins() {

    const dispatch = useDispatch();
    dispatch(getAdmins());
    const { data } = useSelector((state: RootState) => state.adminTable);

    return (
        <div className="card-box mb-30 ">
                <DataTable
                    title="Admin List"
                    columns={columns}
                    data={data}
                    pagination={true}
                />
        </div>
    )
}
