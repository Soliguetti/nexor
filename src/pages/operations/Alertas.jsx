import React from 'react';
import { Box, Typography } from '@mui/material';
import FilterSidebar from '../../components/FilterSidebar';
import DashboardStats from '../../components/DashboardStats';
import AlertsList from '../../components/AlertsList';

export default function Alertas() {
  return (
    <Box>
      
      <DashboardStats />

      <Box sx={{ paddingTop: '24px' }}>
        <AlertsList />
      </Box>
      
      <Box sx={{ paddingTop: '24px' }}>
        <Typography variant="h4" component="h2">
          Alertas
        </Typography>
        <Typography variant="body1">
          Aqui será exibido o conteúdo da seção de alertas, que será filtrado pelos controles no painel lateral.
        </Typography>
      </Box>

      <FilterSidebar />


    </Box>
  );
}