import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getAdmins} from "../../store/actions/tablesActions";
import MUIDataTable from "mui-datatables";

export function Admins() {

    const columns = [
        {
            label: 'Email',
            name: 'email',
            options : {
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
            name: 'gender'
        },
        {
            label: 'Birthday',
            name: 'birthday',
            options : {
                filter : false
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
    const { loading, data } = useSelector((state: RootState) => state.adminTable);

    useEffect(() => {
        dispatch(getAdmins());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const options = {
        searchPlaceholder : "search ...",
        selectableRowsHeader : false,
        selectableRowsHideCheckboxes : true,
        textLabels: {
            body: {
                noMatch: loading ?
                    'Loading' :
                    'Sorry, there is no matching data to display',
            },
        }
    };

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
