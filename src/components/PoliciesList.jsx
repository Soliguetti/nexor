import React, { useState } from 'react';
import { Stack, Pagination, Box } from '@mui/material';
import PolicyTicket from './PolicyTicket';

const mockPolicies = Array.from({ length: 15 }, (_, i) => ({
  id: `policy-${i + 1}`,
  title: `Know Your Customer ${i + 1}`,
  tags: [
    { label: 'Pessoa Jurídica' },
    { label: 'Tipo' },
    { label: 'Custo' },
  ],
}));

export default function PoliciesList() {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const count = Math.ceil(mockPolicies.length / ITEMS_PER_PAGE);
  const paginatedData = mockPolicies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    // --- ADICIONE A PROP 'sx' AQUI ---
    <Stack spacing={2} sx={{ pb: 12 }}> 
      {paginatedData.map((policy) => (
        <PolicyTicket
          key={policy.id}
          title={policy.title}
          tags={policy.tags}
        />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
        <Pagination 
          count={count}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Stack>
  );
}