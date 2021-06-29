import React, {useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {getScheduledJobs} from "../../store/actions/tablesActions";
import {RootState} from "../../store/reducers/rootReducer";

const columns = [
    {
        label: 'Date',
        name: 'startedDate',
        options  : {
            display : false
        }
    },
    {
        label: 'Job Id',
        name: 'jobID',
        options : {
            display : false
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
            display : false
        }
    },
    {
        label: 'Recurrence',
        name: 'recurrence',
    },
    {
        label: 'Shift On',
        name: 'shiftOn'
    },
    {
        label: 'Shift Off',
        name: 'shiftOff'
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
            display : false
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
            display : false
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
            display : false
        }
    }
];

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
};

export function Jobs() {

    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.scheduleJobTable);

    useEffect(() => {
        dispatch(getScheduledJobs());
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