import React from 'react';
import { Box } from '@mui/material'; // Não precisamos mais do Grid
import StatCard from './StatCard';

const statsData = [
  { title: 'Pendente', value: '00000', color: '#fdd835' },
  { title: 'Em Análise', value: '00000', color: '#1e88e5' },
  { title: 'Concluído', value: '00000', color: '#43a047' },
  { title: 'Atrasado', value: '00000', color: '#e53935' },
  { title: 'TMA', value: '00h00m' },
];

export default function DashboardStats() {
  return (
    // MUDANÇA 1: Este Box agora é o container Flexbox
    <Box
      sx={{
        width: '100%',
        margin: '24px 0',
        display: 'flex', // Transforma em Flexbox
        gap: '24px',     // Espaçamento entre os cards
      }}
    >
      {statsData.map((stat) => (
        // MUDANÇA 2: Cada card agora é um item flex que cresce
        <Box
          key={stat.title}
          sx={{
            flex: 1, // A regra de ouro: faz cada item ocupar um espaço igual
          }}
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            color={stat.color}
          />
        </Box>
      ))}
    </Box>
  );
}