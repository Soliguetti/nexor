import React from 'react';
import { Outlet } from 'react-router-dom';
import SubMenu_Management from '../../components/SubMenu_Management';
import FilterSidebar from '../../components/FilterSidebar';

export default function Gerenciamento() {
  return (
    <>
      
      <SubMenu_Management />
      <Outlet />
      
    </>
  );
}