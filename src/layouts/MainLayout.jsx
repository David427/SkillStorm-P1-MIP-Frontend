import React from 'react';
import { Outlet } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <>
      <Header />
      {/* This component shows any components encapsulated by the layout */}
      <Outlet />
      <ToastContainer position="top-center" theme="light" transition={Slide} pauseOnFocusLoss={false} />
    </>
  );
};

export default MainLayout;
