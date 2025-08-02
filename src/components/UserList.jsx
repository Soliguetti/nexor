import React, { useState } from 'react';
import { Stack, Pagination, Box } from '@mui/material';
import UserTicket from './UserTicket';

// Dados de exemplo iniciais
const initialMockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: `0000${i + 1}`.slice(-6),
  name: `Nome do Usuário ${i + 1}`,
  timestamp: `10:${i < 10 ? '0' : ''}${i} 26/07/2025`,
  email: `usuario${i + 1}@servidor.com.br`,
}));

export default function UserList() {
  // Os dados agora ficam no state para podermos modificá-los (excluir)
  const [users, setUsers] = useState(initialMockUsers);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Função para deletar um usuário da lista
  const handleDeleteUser = (userIdToDelete) => {
    setUsers(users.filter(user => user.id !== userIdToDelete));
  };

  const count = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedData = users.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ pb: 12 }}>
      {paginatedData.map((user) => (
        <UserTicket
          key={user.id}
          user={user}
          onDelete={handleDeleteUser} // Passamos a função de deletar para o filho
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