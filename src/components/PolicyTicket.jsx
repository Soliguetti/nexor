import React from 'react';
import { Box, Typography, Button, Stack, Chip, Paper } from '@mui/material';

export default function PolicyTicket({ title, tags }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        border: 'none',
        borderRadius: '15px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding:'25px 0' }}>
        <Typography variant="body1" fontWeight="bold">
          {title}
        </Typography>
        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Chip
              key={tag.label}
              label={tag.label}
              size="small"
              sx={{
                backgroundColor: 'rgba(var(--color-rgb-normal), 0.15)',
                color: 'var(--color-text-dark)',
                fontSize: '12px',
                padding: '10px'
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#0f1a3d' }} // Usando o azul escuro primário
        >
          Executar
        </Button>
      </Box>
    </Paper>
  );
}