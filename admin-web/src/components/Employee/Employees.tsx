import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEmployees} from "../../store/actions/tablesActions";
import {RootState} from "../../store/reducers/rootReducer";
import MUIDataTable from "mui-datatables";
import {TableLoading} from "../Common/Other/TableLoading";

export function Employees() {

    const columns = [
        {
            label: 'Email',
            name: 'email',
            options : {
                display : true,
                filter : false
            }
        },
        {
            label: 'First Name',
            name: 'firstName',
            options : {
                filter : false
            }
        },
        {
            label: 'Last Name',
            name: 'lastName',
            options : {
                filter : false
            }
        },
        {
            label: 'Gender',
            name: 'gender',
            options: {
                display: false
            }
        },
        {
            label: 'Birthday',
            name: 'birthday',
            options : {
                filter : false,
                display: false
            }
        },
        {
            label: 'Address',
            name: 'address',
            options : {
                filter : false
            }
        },
        {
            label: 'Position',
            name: 'position'
        },
        {
            label: 'Contact Number',
            name: 'contactNumber',
            options : {
                filter : false
            }
        },
        {
            label: 'Actions',
            name : 'action'
        }
    ];

    const dispatch = useDispatch();
    const { loading, data } = useSelector((state: RootState) => state.employeeTable);

    useEffect(() => {
        dispatch(getEmployees());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const options = {
        searchPlaceholder : "search ...",
        selectableRowsHeader : false,
        selectableRowsHideCheckboxes : true,
        textLabels: {
            body: {
                noMatch: loading ?
                    <TableLoading/> :
                    'Sorry, there is no matching data to display',
            },
        }
    };

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
