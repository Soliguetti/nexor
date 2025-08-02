import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FilterSidebar from '../../components/FilterSidebar';
import DashboardStats from '../../components/DashboardStats';
import TransacionalAlertTicket from '../../components/TransacionalAlertTicket';

export default function AlertasTransacionais() {
  const [tickets, setTickets] = useState([{ id: Date.now() }]);

  const addTicket = () => {
    setTickets((prev) => [...prev, { id: Date.now() }]);
  };

  const deleteTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Box>

      <Box sx={{ paddingTop: '24px' }}>

        {tickets.map((ticket) => (
          <TransacionalAlertTicket
            key={ticket.id}
            onDelete={() => deleteTicket(ticket.id)}
          />
        ))}

        <Button onClick={addTicket} variant="outlined">
          Adicionar Alerta
        </Button>
      </Box>

      <FilterSidebar />
    </Box>
  );
}
