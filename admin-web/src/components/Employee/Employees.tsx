import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees} from "../../store/actions/tablesActions";
import {RootState} from "../../store/reducers/rootReducer";
import MUIDataTable from "mui-datatables";

const columns = [
    {
        label: 'Email',
        name: 'email',
        options : {
            display : true,
            viewColumns : false
        }
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
        name: 'birthday',
        sortable: true,
    },
    {
        label: 'Address',
        name: 'address'
    },
    {
        label: 'Position',
        name: 'contactNumber'
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

export function Employees() {
    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.employeeTable);

    useEffect(() => {
        dispatch(getEmployees());
    },[])

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Employees"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
