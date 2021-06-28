import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
    {
      label: 'Date',
      name: 'date'
    },
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
        name: 'address',
        options : {
            display : false
        }
    },
    {
        label: 'Recurrence',
        name: 'recurrence',
        options : {

        }
    },
    {
        label: 'Shift',
        name: 'shift'
    },
    {
        label: 'No. of Worked Employees',
        name: 'noOfWorkedEmployees'
    }
];

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
}

export function JobHistory() {

    const data = [
        ['21th of May 2021','E1000', 'University of Moratuwa Cleaning Service', 'Katubedda, Moratuwa', 'Daily', '08:00 - 17:00',
            <div className="badge badge-dyellow text-dark">28</div>],
        ['21th of May 2021','E1001', 'University of Kelania Cleaning Service', 'Kelaniya', 'Weekly', '08:00 - 17:00',
            <div className="badge badge-dyellow text-dark">67</div>]
    ];

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Job History"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
