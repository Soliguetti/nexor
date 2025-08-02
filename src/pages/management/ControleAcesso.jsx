import React from 'react';
import { Box } from '@mui/material';
import FilterSidebar from '../../components/FilterSidebar';
import UserList from '../../components/UserList';

export default function ControleAcesso() {
  return (
    <Box>
      {/* CORREÇÃO: Passe a prop 'showAddButton={true}' aqui */}
      <FilterSidebar showAddButton={true} />
      
      <Box sx={{ paddingTop: '24px' }}>
        <UserList />
      </Box>
    </Box>
  );
}