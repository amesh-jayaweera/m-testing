import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getAdmins} from "../../store/actions/tablesActions";
import MUIDataTable from "mui-datatables";

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
};

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
    ];

    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.adminTable);

    useEffect(() => {
        dispatch(getAdmins());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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
