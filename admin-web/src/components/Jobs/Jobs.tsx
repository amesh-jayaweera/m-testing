import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
    {
        label: 'Job Id',
        name: 'jobID'
    },
    {
        label: 'Title',
        name: 'title'
    },
    {
        label: 'Address',
        name: 'address'
    },
    {
        label: 'Recurrence',
        name: 'recurrence'
    },
    {
        label: 'Shift',
        name: 'shift'
    },
    {
        label: 'No. of Assigned Employees',
        name: 'noOfAssignedEmployees'
    }
];

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
}

export function Jobs() {

    const data = [
        ['E1000', 'University of Moratuwa Cleaning Service', 'Katubedda, Moratuwa', 'Daily', '08:00 - 17:00',
            <div className="badge badge-dyellow text-dark">30</div>],
        ['E1001', 'University of Kelania Cleaning Service', 'Kelaniya', 'Weekly', '08:00 - 17:00',
            <div className="badge badge-dyellow text-dark">70</div>]
    ];

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
