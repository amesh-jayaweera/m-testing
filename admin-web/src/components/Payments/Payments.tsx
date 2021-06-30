import React from "react";
import MUIDataTable from "mui-datatables";

const columns = [
    {
        label: 'Date',
        name: 'date'
    },
    {
        label: 'Pay Sheet No.',
        name: 'paySheetNo'
    },
    {
        label: 'Email',
        name: 'email',
        options : {
            display : false
        }
    },
    {
        label: 'Name',
        name: 'name'
    },
    {
        label: 'Worked Hours',
        name: 'workedHours'
    },
    {
        label: 'Worked Jobs',
        name: 'workedJobs'
    },
    {
        label: 'Salary',
        name: 'salary'
    },
    {
        label: 'Status',
        name: 'status'
    }
];

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
};

export function Payments() {

    const data = [
        ['21sth of May 2021','P001', 'ameshmbjyw97@gmail.com', 'Amesh Jayaweera', '46 hours and 20 minutes', 4 , '$ 1700',
            <div className="badge badge-dgreen text-white">Approved</div>],
        ['21sth of May 2021','P002', 'hiruni97@gmail.com', 'Hiruni Maleesha', '45 hours and 34 minutes', 5 , '$ 1600',
            <div className="badge badge-dgreen text-white">Approved</div>],
    ];

    return (
        <div className="card-box mb-30 ">
            <MUIDataTable
                title={"Payments"}
                data={data}
                columns={columns}
                options={options}
            />
        </div>
    )
}
