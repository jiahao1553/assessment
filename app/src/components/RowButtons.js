import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../employee/actions";

const RowButtons = (props) => {
  const dispatch = useDispatch();
  const editClicked = () => {
    window.location = `/employee/edit/${props.data.id}`;
  };

  const deleteClicked = () => {
    const confirmResult = window.confirm(
      `Are you sure you want to delete the following record? \nFirst Name: ${props.data.firstName} \nLast Name: ${props.data.lastName}`
    );
    if (confirmResult === true) dispatch(deleteEmployee(props.data));
  };

  return (
    <div>
      <Button type='primary' className='mr-2' onClick={() => editClicked()}>
        Edit
      </Button>
      <Button type='danger' onClick={() => deleteClicked()}>
        Delete
      </Button>
    </div>
  );
};

export default RowButtons;
