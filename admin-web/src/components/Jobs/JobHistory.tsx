import React, {useEffect, useState} from "react";
import MUIDataTable from "mui-datatables";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {getRunningJobHistory} from "../../store/actions/tablesActions";
import {TableLoading} from "../Common/Other/TableLoading";
import {validateDateFormat} from "../../util/Regex";

export function JobHistory() {

    let date_from  = new Date();
    let date_to = new Date();
    date_to.setDate(date_to.getDate()-7);
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state: RootState) => state.jobHistory);
    const [from, setFrom] = useState<string>(date_from.toISOString().split('T')[0]);
    const [to, setTo] = useState<string>(date_to.toISOString().split('T')[0]);

    const columns = [
        {
            label: 'Date',
            name: 'date',
            options: {
                filter: true,
                filterType: 'custom',
                filterOptions: {
                    names: [],
                    logic: (date : any, filters : any) => {
                        const val1 = new Date(from) as any;
                        const val2 = new Date(to) as any;
                        const val3 = new Date(date) as any;
                        if(!(val1 >= val3 && val2 <= val3)) {
                            return true;
                        }
                        return false;
                    },
                    display: (filterList : any, onChange : any, index : any, column : any) => {
                        return (
                                <>
                                <div className="row">
                                    <div className="form-group mb-0">
                                        <label>From</label>
                                        <input type="date" className="form-control"
                                               value={from}
                                            onChange={(e) => {
                                                setFrom(e.target.value?.trim());
                                                filterList[index][0] = e.target.value;
                                                onChange(filterList[index], index, column);
                                            }}
                                        />
                                        {
                                            !validateDateFormat(from) && <small className="invalid-feedback">Invalid Date Format</small>
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group mb-0">
                                        <label>To</label>
                                        <input type="date" className="form-control"
                                               value={to}
                                            onChange={(e) => {
                                                setTo(e.target.value?.trim());
                                                filterList[index][1] = e.target.value;
                                                onChange(filterList[index], index, column);
                                            }}
                                        />
                                        {
                                            !validateDateFormat(to) && <small className="invalid-feedback">Invalid Date Format</small>
                                        }
                                    </div>
                                </div>
                                </>
                        );
                    }
                }
            }
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
                    <TableLoading/> :
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
                columns={columns as any}
                options={options}
            />
        </div>
    )
}
