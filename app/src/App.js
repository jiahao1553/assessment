import { Button, Layout } from "antd";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddEdit from "./components/AddEdit";
import { List } from "./components/List";

const App = () => {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Header className='text-light'>
        <a href='/employee/list' className='text-light'>
          <b>Employee Manager</b>
        </a>
        {window.location.pathname === "/employee/list" && (
          <Button type='primary' className='right header-item' href='/employee/add'>
            Add
          </Button>
        )}
      </Header>
      <Content className='page-size'>
        <BrowserRouter>
          <Routes>
            <Route path='employee/list' element={<List />} />
            <Route path='employee/add' element={<AddEdit />} />
            <Route path='employee/edit/:id' element={<AddEdit />} />
            <Route path='*' element={<Navigate to='employee/list' />} />
          </Routes>
        </BrowserRouter>
      </Content>
    </Layout>
  );
};

export default App;
