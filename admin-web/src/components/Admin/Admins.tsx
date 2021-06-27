import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getAdmins} from "../../store/actions/tablesActions";
import MUIDataTable from "mui-datatables";

const columns = [
    {
        label: 'Email',
        name: 'email'
    },
    {
        label: 'First Name',
        name: 'firstName'
    },
    {
        label: 'Last Name',
        name: 'lastName'
    },
    {
        label: 'Gender',
        name: 'gender'
    },
    {
        label: 'Birthday',
        name: 'birthday'
    },
    {
        label: 'Address',
        name: 'address'
    },
    {
        label: 'Contact Number',
        name: 'contactNumber'
    },
];

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
}

export function Admins() {

    const dispatch = useDispatch();
    dispatch(getAdmins());
    const { data } = useSelector((state: RootState) => state.adminTable);

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Admins"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
