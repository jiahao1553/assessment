import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployees } from "../employee/actions";
import RowButtons from "./RowButtons";

export const List = () => {
  const { data: employees } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEmployees());
  }, []);

  return (
    <div className='ag-theme-alpine p-2' style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        rowData={employees}
        reactUi='true'
        frameworkComponents={{
          rowButtonsRenderer: RowButtons,
        }}
      >
        <AgGridColumn headerName='First Name' field='firstName'></AgGridColumn>
        <AgGridColumn headerName='Last Name' field='lastName'></AgGridColumn>
        <AgGridColumn headerName='Email Address' field='email'></AgGridColumn>
        <AgGridColumn headerName='Phone Number' field='number'></AgGridColumn>
        <AgGridColumn headerName='Gender' field='gender'></AgGridColumn>
        <AgGridColumn headerName='Action' cellRenderer='rowButtonsRenderer'></AgGridColumn>
      </AgGridReact>
    </div>
  );
};
