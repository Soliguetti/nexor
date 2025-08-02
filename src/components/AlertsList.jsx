import React, { useState } from 'react';
// 1. Importe o useState e o componente Pagination
import { Stack, Pagination, Box } from '@mui/material';
import AlertTicket from './AlertTicket';

// Dados de exemplo expandidos para termos mais de 10 itens
const mockAlerts = Array.from({ length: 25 }, (_, i) => ({
  id: `0000${i + 1}`.slice(-6),
  timestamp: `10:${i < 10 ? '0' : ''}${i} 26/07/2025`,
  tags: [
    { label: i % 4 === 0 ? 'Atrasado' : 'Em Análise', type: i % 4 === 0 ? 'high_risk' : 'normal' },
    { label: i % 3 === 0 ? 'Alto Risco' : 'Médio Risco', type: i % 3 === 0 ? 'highest_risk' : 'medium_risk' },
    { label: 'Tipo', type: 'normal' },
  ],
}));

export default function AlertsList() {
  // 2. Lógica de Paginação
  const [page, setPage] = useState(1); // Estado para controlar a página atual
  const ITEMS_PER_PAGE = 10; // Constante para definir quantos itens por página

  // Calcula o número total de páginas
  const count = Math.ceil(mockAlerts.length / ITEMS_PER_PAGE);
  
  // "Fatia" o array de dados para pegar apenas os itens da página atual
  const paginatedData = mockAlerts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // Função para mudar de página
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      {/* 3. Renderiza apenas os dados da página atual */}
      {paginatedData.map((alert) => (
        <AlertTicket
          key={alert.id}
          id={alert.id}
          timestamp={alert.timestamp}
          tags={alert.tags}
        />
      ))}

      {/* 4. Adiciona o componente de Paginação */}
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