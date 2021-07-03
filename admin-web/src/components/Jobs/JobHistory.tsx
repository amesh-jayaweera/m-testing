import React, {useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getRunningJobHistory} from "../../store/actions/tablesActions";

export function JobHistory() {

    const dispatch = useDispatch();
    const { loading, data } = useSelector((state: RootState) => state.jobHistory);

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

    const options = {
        searchPlaceholder : "search ...",
        selectableRowsHeader : false,
        selectableRowsHideCheckboxes : true,
        textLabels: {
            body: {
                noMatch: loading ?
                    'Loading ...' :
                    'Sorry, there is no matching data to display',
            },
        }
    };

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
