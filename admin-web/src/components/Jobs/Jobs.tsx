import React, {useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {getScheduledJobs} from "../../store/actions/tablesActions";
import {RootState} from "../../store/reducers/rootReducer";

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
};

export function Jobs() {

    const columns = [
        {
            label: 'Date',
            name: 'startingDate',
            options  : {
                display : false,
                filter : false
            }
        },
        {
            label: 'Job Id',
            name: 'jobID',
            options : {
                display : false,
                filter : false
            }
        },
        {
            label: 'Title',
            name: 'title'
        },
        {
            label : 'Category',
            name : 'category'
        },
        {
            label: 'Address',
            name: 'address',
            options : {
                display : false,
                filter : false
            }
        },
        {
            label: 'Recurrence',
            name: 'recurrence',
        },
        {
            label: 'Shift On',
            name: 'shiftOn',
            options : {
                filter : false
            }
        },
        {
            label: 'Shift Off',
            name: 'shiftOff',
            options : {
                filter : false
            }
        },
        {
            label : 'Recurrence Days',
            name : 'days',
            options : {
                display : false
            }
        },
        {
            label : 'Status',
            name : 'status'
        },
        {
            label: 'No. of Worked Employees',
            name: 'noOfWorkedEmployees',
            options : {
                display : false,
                filter : false
            }
        },
        {
            label : 'Active',
            name : 'active',
            options : {
                display : false
            }
        },
        {
            label : 'Created By',
            name : 'createdAdmin',
            options : {
                display : false
            }
        },
        {
            label : 'Created Date',
            name : 'createdDate',
            options : {
                display : false,
                filter : false
            }
        },
        {
            label : 'Updated By',
            name : 'updatedAdmin',
            options : {
                display : false
            }
        },
        {
            label : 'Updated Date',
            name : 'updatedDate',
            options : {
                display : false,
                filter : false
            }
        },
        {
            label : 'Actions',
            name : 'action',
            options : {
                filter : false
            }
        }
    ];

    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.scheduleJobTable);

    useEffect(() => {
        dispatch(getScheduledJobs());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Scheduled Jobs"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}