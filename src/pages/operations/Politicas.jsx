import React from 'react';
import { Box, Typography } from '@mui/material';
import FilterSidebar from '../../components/FilterSidebar';
import PoliciesList from '../../components/PoliciesList';

export default function Politicas() {
  return (
    <Box>
      {/* Podemos reutilizar o mesmo componente de filtro! */}
      <FilterSidebar />
      
      {/* Container para a lista de políticas */}
      <Box sx={{ paddingTop: '24px' }}>
        <PoliciesList />
      </Box>
    </Box>
  );
}