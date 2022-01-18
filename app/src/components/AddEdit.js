import { Button, Form, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addEmployee, editEmployee, loadEmployees } from "../employee/actions";

const AddEdit = () => {
  const composeType = window.location.pathname === "/employee/add" ? "ADD" : "EDIT";
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const [addEditForm] = Form.useForm();
  const { id } = useParams();

  const { data: employees } = useSelector((state) => state);
  const dispatch = useDispatch();

  const unloadCallback = (event) => {
    event.preventDefault();
    event.returnValue = true;
  };

  const onFinish = (values) => {
    values.number = Number(values.number);
    if (composeType === "ADD") dispatch(addEmployee({ ...values }));
    if (composeType === "EDIT") dispatch(editEmployee({ ...values, id: id }));
    window.onbeforeunload = null;
    window.location = "/employee/list";
  };

  const onFinishFailed = () => {
    alert("Please fix the error on the form");
  };

  useEffect(() => {
    dispatch(loadEmployees());
  }, []);

  useEffect(() => {
    if (composeType === "EDIT" && employees.length > 0) {
      const index = employees.findIndex((e) => e.id === id);
      const typedEmployee = { ...employees[index], number: employees[index].number.toString() };
      addEditForm.setFieldsValue(typedEmployee);
    }
  }, [employees]);

  useEffect(() => {
    window.onbeforeunload = unloadCallback;
    return () => (window.onbeforeunload = null);
  }, []);

  return (
    <>
      {composeType === "ADD" && <h1 className='text-center'>Add new Employee</h1>}
      {composeType === "EDIT" && <h1 className='text-center'>Edit Employee Information</h1>}
      <Form form={addEditForm} name='add-edit-form' scrollToFirstError onFinish={onFinish} onFinishFailed={onFinishFailed} className='p-2' {...formItemLayout}>
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[
            { required: true, message: "Please input first name" },
            { min: 6, message: "The first name is less than 6 characters" },
            { max: 10, message: "The first name is more than 10 characters" },
          ]}
        >
          <Input placeholder="Enter employee's first name" />
        </Form.Item>

        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[
            { required: true, message: "Please input last name" },
            { min: 6, message: "The last name is less than 6 characters" },
            { max: 10, message: "The last name is more than 10 characters" },
          ]}
        >
          <Input placeholder="Enter employee's last name" />
        </Form.Item>

        <Form.Item
          label='Email Address'
          name='email'
          rules={[
            {
              type: "email",
              message: "The input is not valid email address",
            },
            {
              required: true,
              message: "Please input email address",
            },
          ]}
        >
          <Input placeholder="Enter employee's email address" />
        </Form.Item>

        <Form.Item
          label='Phone Number'
          name='number'
          rules={[
            { required: true, message: "Please input phone number" },
            { pattern: /65(6|8|9)\d{7}/g, message: "The input is not a valid SG phone number" },
            { max: 10, message: "The phone number is more than 10 characters" },
          ]}
        >
          <Input placeholder="Enter employee's SG phone number" />
        </Form.Item>

        <Form.Item label='Gender' name='gender' rules={[{ required: true, message: "Please input gender" }]}>
          <Radio.Group>
            <Radio.Button value='male'>Male</Radio.Button>
            <Radio.Button value='female'>Female</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button className='bottom-right' type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddEdit;
