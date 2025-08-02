import React from 'react';
import { Box, Typography } from '@mui/material';

export default function StatCard({ title, value, color }) {
  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        // --- MUDANÇAS AQUI PARA CENTRALIZAR ---
        display: 'flex',          // Ativa o layout flexível
        flexDirection: 'column',  // Organiza o conteúdo em uma coluna (um item abaixo do outro)
        alignItems: 'center',     // Centraliza o conteúdo horizontalmente
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Box
          component="span"
          sx={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: color,
            marginRight: '8px',
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold" color="text.primary">
        {value}
      </Typography>
    </Box>
  );
}