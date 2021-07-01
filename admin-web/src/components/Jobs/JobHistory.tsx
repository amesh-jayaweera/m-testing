import React, {useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getRunningJobHistory} from "../../store/actions/tablesActions";

const options = {
    searchPlaceholder : "search ...",
    selectableRowsHeader : false,
    selectableRowsHideCheckboxes : true
};

export function JobHistory() {

    const dispatch = useDispatch();
    const { data } = useSelector((state: RootState) => state.jobHistory);

    const columns = [
        {
            label: 'Date',
            name: 'date'
        },
        {
            label: 'Job Id',
            name: 'jobId',
            options : {
                filter : false
            }
        },
        {
            label: 'Title',
            name: 'title'
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
            label: 'Category',
            name: 'category'
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
            label: 'Employee Details',
            name: 'employeeDetails',
            options : {
                filter : false
            }
        }
    ];

    useEffect(() => {
        dispatch(getRunningJobHistory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


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
